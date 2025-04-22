<template>
    <div class="page-background">
        <div class="main-container">
            <!-- 头部区域 -->
            <header class="header">
                <!-- <div class="username">
                    <span v-if="user">
                        欢迎, <router-link to="/mypage">{{ user.username }}</router-link>
                        <a href="/logout" @click.prevent="handleLogout">退出登录</a>
                    </span>
                    <span v-else>
                        你好， <router-link to="/logsign">请登录</router-link>
                    </span>
                </div>

                <div class="logo">
                    <img src="../public/images/logo.png" alt="peiahuishi">
                </div> -->

                <!-- <div class="utility">
                    <router-link :to="`/seller/${user?.id}`">卖家中心</router-link>
                    <router-link to="/cart">购物车</router-link>
                    <router-link to="/customerService">客服</router-link>
                </div> -->
            </header>

            <!-- 头像区域 -->
            <!-- 头像和表单容器 -->
            <div class="profile-container">
                <!-- 头像区域 -->
                <div class="avatar-section">
                    <div class="avatar">
                        <h2>您的头像:</h2>
                        <img src="/touxiang.png" alt="用户头像" width="200" height="200" class="avatar-image">
                        <!-- <img :src="user?.avatar" alt="用户头像" width="100" height="100"> -->
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
                        </div>
                    </div>
                </div>
            </div>
            <Drawer v-model:visible="visibleRight" header="账户管理" position="right">
                <form @submit.prevent="updateUserInfo">
                    <!-- <label>用户名:
                    <input type="text" v-model="userForm.username">
                </label> -->
                    <br />
                    <FloatLabel>
                        <InputText id="username" v-model="userForm.username" />
                        <label for="username">修改用户名</label>
                    </FloatLabel>
                    <br />
                    <!-- <label>头像：
                    <input type="file" @change="handleAvatarUpload">
                </label> -->
                    <!-- <label>密码：
                    <input type="password" v-model="userForm.password">
                </label> -->
                    <FloatLabel>
                        <InputText id="password" v-model="userForm.password" />
                        <label for="password">修改密码</label>
                    </FloatLabel>
                    <br />
                    <FloatLabel>
                        <InputText id="username" v-model="newAddress" />
                        <label for="username">修改发货地址</label>
                    </FloatLabel>
                    <br />
                    <Button type="file" severity="secondary">点击更新头像</Button>
                    <br />
                    <Button type="submit" raised>更新信息</Button>
                </form>
            </Drawer>
            <!-- </Drawer> -->
            <!-- 订单面板 -->
            <div v-show="activeTab === 0" class="tab-panel">
                <h2>您的订单:</h2>
                <div class="card">
                    <DataTable :value="products" tableStyle="min-width: 50rem">
                        <Column v-for="order in orders" :key="order.id" :field="col.field" :header="col.header">
                        </Column>
                    </DataTable>
                </div>
                <!-- <div v-for="order in orders" :key="order.id">
                <h3>订单 ID: {{ order.id }}</h3>
                <h4>下单时间：{{ formatDate(order.createdAt) }}</h4>
                <ul>
                    <li v-for="goods in order.goodsList" :key="goods.id">
                        {{ goods.name }} - 数量: {{ goods.quantity }} - 价格: {{ goods.price }}
                        <router-link :to="`/api/comments/submit?goodsId=${goods.id}`">去评论</router-link>
                    </li>
                </ul>
            </div> -->
            </div>

            <!-- 选项卡容器 -->
            <!-- <div class="container">
            <ul class="tab-list">
                <li v-for="(tab, index) in tabs" :key="index" :class="['tab', { active: activeTab === index }]"
                    @click="activeTab = index">
                    <a class="tab-control">{{ tab }}</a>
                </li>
            </ul>


            <div v-show="activeTab === 1" class="tab-panel">
                <h2>地址管理</h2>
                <form @submit.prevent="submitAddress">
                    <input type="text" v-model="newAddress" placeholder="请输入新地址" required>
                    <button type="submit">提交</button>
                </form>
                <p v-if="responseMessage" :style="{ color: messageColor }">{{ responseMessage }}</p>
            </div>
        </div> -->

            <router-link to="/home" class="home-button">返回首页</router-link>
        </div>
    </div>
</template>
<style scoped>
/* 添加页面背景样式 */
.page-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    background-image: url('/background.jpg');
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

/* .profile-container {
    display: flex;
    gap: 2rem;
    margin-top: 2rem;
    align-items: flex-start;
} */

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
<script setup>
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Drawer from 'primevue/drawer';
import Button from "primevue/button"
const router = useRouter()
const visibleRight = ref(false);

// 响应式数据
const user = ref(null)
const orders = ref([])
const activeTab = ref(0)
const newAddress = ref('')
const responseMessage = ref('')
const messageColor = ref('green')

const userForm = reactive({
    username: '',
    password: '',
    avatar: null
})

const tabs = ['历史订单', '地址管理', '账户管理']

// 生命周期钩子
onMounted(async () => {
    try {
        const [userRes, ordersRes] = await Promise.all([
            axios.get('/api/user'),
            axios.get('/api/orders')
        ])
        user.value = userRes.data
        orders.value = ordersRes.data
    } catch (error) {
        console.error('数据加载失败:', error)
    }
})

// 方法
const handleLogout = async () => {
    try {
        await axios.post('/logout')
        router.push('/login')
    } catch (error) {
        console.error('注销失败:', error)
    }
}

const submitAddress = async () => {
    try {
        await axios.post('/api/address', {
            userId: user.value.id,
            address: newAddress.value
        })
        responseMessage.value = '地址更新成功'
        newAddress.value = ''
    } catch (error) {
        messageColor.value = 'red'
        responseMessage.value = '地址更新失败'
    }
}

const handleAvatarUpload = (event) => {
    userForm.avatar = event.target.files[0]
}

const updateUserInfo = async () => {
    const formData = new FormData()
    formData.append('username', userForm.username)
    formData.append('password', userForm.password)
    if (userForm.avatar) {
        formData.append('avatar', userForm.avatar)
    }

    try {
        await axios.post('/api/user/update', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        // 更新用户信息
        const res = await axios.get('/api/user')
        user.value = res.data
    } catch (error) {
        console.error('信息更新失败:', error)
    }
}

const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString()
}
</script>