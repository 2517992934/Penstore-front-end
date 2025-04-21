<template>
    <div class="main-container">
        <!-- 头部区域 -->
        <header class="header">
            <div class="username">
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
            </div>

            <div class="utility">
                <router-link :to="`/seller/${user?.id}`">卖家中心</router-link>
                <router-link to="/cart">购物车</router-link>
                <router-link to="/customerService">客服</router-link>
            </div>
        </header>

        <!-- 头像区域 -->
        <div class="avatar">
            <h2>您的头像:</h2>
            <img :src="user?.avatar" alt="用户头像" width="100" height="100">
        </div>
        <Button @click="visibleRight = true" label="账户管理" />
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
                <Button type="file" severity="secondary">点击更新头像</Button>
                <br />
                <Button type="submit" raised>更新信息</Button>
            </form>
        </Drawer>


        <!-- 选项卡容器 -->
        <div class="container">
            <ul class="tab-list">
                <li v-for="(tab, index) in tabs" :key="index" :class="['tab', { active: activeTab === index }]"
                    @click="activeTab = index">
                    <a class="tab-control">{{ tab }}</a>
                </li>
            </ul>

            <!-- 订单面板 -->
            <div v-show="activeTab === 0" class="tab-panel">
                <h2>您的订单:</h2>
                <div v-for="order in orders" :key="order.id">
                    <h3>订单 ID: {{ order.id }}</h3>
                    <h4>下单时间：{{ formatDate(order.createdAt) }}</h4>
                    <ul>
                        <li v-for="goods in order.goodsList" :key="goods.id">
                            {{ goods.name }} - 数量: {{ goods.quantity }} - 价格: {{ goods.price }}
                            <router-link :to="`/api/comments/submit?goodsId=${goods.id}`">去评论</router-link>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- 地址管理 -->
            <div v-show="activeTab === 1" class="tab-panel">
                <h2>地址管理</h2>
                <form @submit.prevent="submitAddress">
                    <input type="text" v-model="newAddress" placeholder="请输入新地址" required>
                    <button type="submit">提交</button>
                </form>
                <p v-if="responseMessage" :style="{ color: messageColor }">{{ responseMessage }}</p>
            </div>
        </div>

        <div class="user-info">
            <router-link to="/home">返回首页</router-link>
        </div>
    </div>
</template>

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