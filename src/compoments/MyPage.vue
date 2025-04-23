<template>
    <div class="page-background">
        <div class="main-container">
            <!-- 头部区域 -->
            <header class="header">
            </header>

            <!-- 头像区域 -->
            <div class="profile-container">
                <div class="avatar-section">
                    <div class="avatar">
                        <h2>您的头像:</h2>
                        <img src="/touxiang.png" alt="用户头像" width="200" height="200" class="avatar-image">
                    </div>
                    <Button @click="visibleRight = true" label="账户管理" class="avatar-button">点击更新用户信息</Button>
                </div>

                <!-- 账户信息 -->
                <div class="profile-info">
                    <div class="info-card">
                        <h2>账户信息</h2>
                        <div class="info-item">
                            <span class="label">用户名：</span>
                            <span class="value">{{ user?.username || '未设置' }}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">注册时间：</span>
                            <span class="value">{{ formatDate(user?.createdAt) }}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">默认地址：</span>
                            <span class="value">{{ user?.address || '未设置' }}</span>
                            <div class="address-update">
                                <InputText v-model="newAddress" placeholder="输入新地址" />
                                <Button @click="submitAddress" label="更新地址" severity="secondary" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 账户管理抽屉 -->
            <Drawer v-model:visible="visibleRight" header="账户管理" position="right">
                <form @submit.prevent="updateUserInfo">
                    <br />
                    <FloatLabel>
                        <InputText id="username" v-model="userForm.username" />
                        <label for="username">修改用户名</label>
                    </FloatLabel>
                    <br />
                    <FloatLabel>
                        <Password id="password" v-model="userForm.password" toggleMask />
                        <label for="password">修改密码</label>
                    </FloatLabel>
                    <br />
                    <div class="avatar-upload">
                        <label for="avatar">更新头像：</label>
                        <input type="file" id="avatar" @change="handleAvatarUpload" accept="image/*" />
                    </div>
                    <br />
                    <Button type="submit" raised>更新信息</Button>
                </form>
            </Drawer>

            <!-- 订单面板 -->
            <div v-show="activeTab === 0" class="tab-panel">
                <h2>您的订单:</h2>
                <div class="card">
                    <DataTable :value="orders" tableStyle="min-width: 50rem">
                        <Column field="id" header="订单号"></Column>
                        <Column field="date" header="日期"></Column>
                        <Column field="status" header="状态"></Column>
                    </DataTable>
                </div>
            </div>

            <router-link to="/home" class="home-button">返回首页</router-link>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import Button from "primevue/button"
import Drawer from 'primevue/drawer'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import FloatLabel from 'primevue/floatlabel'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const visibleRight = ref(false)
const user = ref(null)
const orders = ref([])
const activeTab = ref(0)
const newAddress = ref('')

const userForm = reactive({
    username: '',
    password: '',
    avatar: null
})

// 初始化数据加载
onMounted(async () => {
    try {
        const [userRes, ordersRes] = await Promise.all([
            axios.get('/api/mypage/changeInfo'), // 假设用户信息获取端点
            axios.get('/api/mypage/orders')//需要用户ID
        ])
        user.value = userRes.data
        orders.value = ordersRes.data
    } catch (error) {
        console.error('数据加载失败:', error)
    }
})

// 地址更新逻辑
const submitAddress = async () => {
    try {
        await axios.post('/api/mypage/address', {
            address: newAddress.value
        })
        user.value.address = newAddress.value
        newAddress.value = ''
    } catch (error) {
        console.error('地址更新失败:', error)
    }
}

// 用户信息更新逻辑
const updateUserInfo = async () => {
    const formData = new FormData()
    if (userForm.username) formData.append('username', userForm.username)
    if (userForm.password) formData.append('password', userForm.password)
    if (userForm.avatar) formData.append('avatar', userForm.avatar)

    try {
        await axios.post('/api/mypage/changeInfo', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        // 更新本地用户数据
        const res = await axios.get('/api/mypage/changeInfo')
        user.value = res.data
        visibleRight.value = false
    } catch (error) {
        console.error('信息更新失败:', error)
    }
}

// 头像上传处理
const handleAvatarUpload = (event) => {
    userForm.avatar = event.target.files[0]
}

// 时间格式化
const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString()
}
</script>
<style scoped>
.address-update {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
}

.avatar-upload {
    margin: 1rem 0;
}

/* 添加页面背景样式 */
.page-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    background-image: url('/public/background.jpg');
    /* 修改为你的图片路径 */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
}

.main-container {
    position: relative;
    background-color: rgba(255, 255, 255, 0.1);
    /* 给内容添加半透明背景 */
    min-height: 100vh;
    padding: 20px;
    width: 61.8%;
    /* 响应式宽度据说黄金分割是最好看的比例 */
    max-width: 1200px;
    /* 最大宽度限制 */
    margin: 0 auto;
    /* 水平居中 */
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    /* 可选添加阴影增强层次感 */
    border-radius: 8px;
    /* 可选圆角效果 */
}

.avatar-image:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
}

.avatar-image {
    border-radius: 50%;
    /* 圆形效果 */
    object-fit: cover;
    /* 保证图片比例不变形 */
    display: block;
    /* 消除图片底部间隙 */
    border: 2px solid #fff;
    /* 可选白色边框 */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    /* 可选阴影效果 */
}

/* 更新按钮定位样式 */
.home-button {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 8px 20px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    text-decoration: none;
    color: #2c3e50;
    font-weight: 500;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    z-index: 100;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.home-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
    background: white;
}

.avatar-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    width: 250px;
}

.user-form {
    background: rgba(255, 255, 255, 0.1);
    margin-top: 5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.avatar-button {
    margin-top: 1rem;
    width: 100%;
}

.submit-button {
    margin-top: 1rem;
    align-self: flex-start;
    margin-left: 9.5rem;
}

.profile-info {
    flex: 1;
    margin-right: 2rem;
}

.info-card {
    background: rgba(255, 255, 255, 0.1);
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.info-item {
    display: flex;
    margin: 1rem 0;
    padding: 0.8rem;
    background: #f8f9fa;
    border-radius: 6px;
}

.label {
    font-weight: 600;
    color: #2c3e50;
    min-width: 100px;
}

.value {
    color: #495057;
    word-break: break-word;
}

/* 调整原有布局 */
.profile-container {
    display: flex;
    gap: 2rem;
    margin-top: 2rem;
    align-items: flex-start;
    flex-wrap: wrap;
}

/* 响应式调整 */
@media (max-width: 992px) {
    .profile-info {
        flex: 100%;
        margin-right: 0;
        order: 1;
    }

    .user-form {
        order: 2;
    }

    .avatar-section {
        order: 0;
    }
}
</style>