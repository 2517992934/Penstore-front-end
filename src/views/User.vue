<template>
    <div class="content" :class="{ 's--signup': showRegister }">
        <!-- 登录表单 -->
        <div class="form sign-in">
            <h2>欢迎回来</h2>
            <form @submit.prevent="handleLogin">
                <label>
                    <span>邮箱</span>
                    <input v-model="loginForm.email" type="email" required>
                </label>
                <label>
                    <span>密码</span>
                    <input v-model="loginForm.password" type="password" required>
                </label>
                <p class="forgot-pass"><a href="#">忘记密码？</a></p>
                <div v-if="loginError" class="alert alert-danger">
                    {{ loginError }}
                </div>
                <button type="submit" class="submit" :disabled="loading">
                    {{ loading ? '登录中...' : '登 录' }}
                </button>
            </form>
        </div>

        <!-- 注册表单 -->
        <div class="sub-cont">
            <div class="img">
                <div class="img__text m--up" :class="{ 'm--in': showRegister }">
                    <h2>{{ showRegister ? '已有帐号？' : '还未注册？' }}</h2>
                    <p v-html="showRegister ? '立即登陆！<br>看好笔' : '来自星尘<br>买好笔！'"></p>
                </div>
                <div class="img__btn" @click="showRegister = !showRegister">
                    <span class="m--up">注 册</span>
                    <span class="m--in">登 录</span>
                </div>
            </div>

            <div class="form sign-up">
                <h2>立即注册</h2>
                <form @submit.prevent="handleRegister">
                    <label>
                        <span>邮箱</span>
                        <input v-model="registerForm.email" type="email" required>
                    </label>
                    <label>
                        <span>验证码</span>
                        <div class="verify-input">
                            <input v-model="registerForm.verificationCode" type="text" required>
                            <button type="button" class="submit" :disabled="codeCooldown > 0"
                                @click="getVerificationCode">
                                {{ codeButtonText }}
                            </button>
                        </div>
                    </label>
                    <label>
                        <span>用户名</span>
                        <input v-model="registerForm.username" type="text" required>
                    </label>
                    <label>
                        <span>密码</span>
                        <input v-model="registerForm.password" type="password" required>
                    </label>
                    <div v-if="registerError" class="alert alert-danger">
                        {{ registerError }}
                    </div>
                    <button type="submit" class="submit" :disabled="loading">
                        {{ loading ? '注册中...' : '注 册' }}
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import request from '@/utils/request';

const router = useRouter()
const userUserStore = useUserStore()

// 登录表单数据
const loginForm = reactive({
    email: '',
    password: ''
})

// 注册表单数据
const registerForm = reactive({
    email: '',
    verificationCode: '',
    username: '',
    password: ''
})

// 状态管理
const showRegister = ref(false)
const loading = ref(false)
const loginError = ref('')
const registerError = ref('')
const codeCooldown = ref(0)

// 验证码按钮文本
const codeButtonText = computed(() =>
    codeCooldown.value > 0 ? `${codeCooldown.value}s后重试` : '获取验证码'
)

// 登录逻辑
const handleLogin = async () => {
    loginError.value = ''
    loading.value = true
    try {
        // await userStore.login(loginForm)
       const response=await request.post('/api/login',loginForm,{
         headers:{

         }
       });
      await userUserStore.myget({})
      window.location.href = 'http://localhost:5173/\n';
    } catch (error) {
        loginError.value = error.response?.data?.message || '登录失败'
    } finally {
        loading.value = false
    }
}

// 注册逻辑
const handleRegister = async () => {
    registerError.value = ''
    loading.value = true
    try {
        await axios.post('/api/register', registerForm)
        console.log('提交注册的表单:', registerForm)
        showRegister.value = false
        loginForm.email = registerForm.email
    } catch (error) {
        registerError.value = error.response?.data?.message || '注册失败'
    } finally {
        loading.value = false
    }
}

// 获取验证码
const getVerificationCode = async () => {
    if (!registerForm.email) {
        registerError.value = '请输入邮箱'
        return
    }

    codeCooldown.value = 60
    const timer = setInterval(() => {
        codeCooldown.value--
        if (codeCooldown.value <= 0) clearInterval(timer)
    }, 1000)

    try {
        await axios.post('/api/send-verification-code', {
            email: registerForm.email
        })
    } catch (error) {
        registerError.value = '验证码发送失败'
    }
}
</script>

<style scoped>
/*login*/
*,
*:before,
*:after {

    box-sizing: border-box;
    margin: 0;
    padding: 0;

}

/*登录注册body样式*/
body {
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
    font-size: 16px;
    color: #6a6f8c;
    /*background: #ededed;*/
    background: #A89F91;
}

input,
button {
    border: none;
    outline: none;
    background: none;
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
}

.tip {
    font-size: 20px;
    margin: 40px auto 50px;
    text-align: center;
}

.content {
    overflow: hidden;
    /*超出部分隐藏*/
    position: absolute;
    left: 50%;
    top: 50%;
    /*居中*/
    width: 900px;
    height: 550px;
    margin: -300px 0 0 -450px;
    background: #fff;
}

.form {
    position: relative;
    width: 640px;
    height: 100%;
    transition: -webkit-transform 0.6s ease-in-out;
    transition: transform 0.6s ease-in-out;
    transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;
    padding: 50px 30px 0;
}

.sub-cont {
    overflow: hidden;
    position: absolute;
    left: 640px;
    top: 0;
    width: 900px;
    height: 100%;
    padding-left: 260px;
    background: #fff;
    transition: -webkit-transform 0.6s ease-in-out;
    transition: transform 0.6s ease-in-out;
    transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;
}

.content.s--signup .sub-cont {
    -webkit-transform: translate3d(-640px, 0, 0);
    transform: translate3d(-640px, 0, 0);
}

/*向左移动*/

/*按钮*/
button {
    display: block;
    margin: 0 auto;
    width: 260px;
    height: 36px;
    border-radius: 30px;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
}

.img {
    overflow: hidden;
    /*超出部分隐藏*/
    z-index: 2;
    /*设置层级*/
    position: absolute;
    /*绝对定位*/
    left: 0;
    /*距离左边0*/
    top: 0;
    /*距离上边0*/
    width: 260px;
    /*宽度*/
    height: 100%;
    /*高度*/
    padding-top: 360px;
    /*上内边距*/
}

.img:before {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 900px;
    height: 100%;
    background-image: url("/images/VCG41N2149216504.jpg");
    background-size: cover;
    /*transition: -webkit-transform 0.6s ease-in-out;*/
    /*transition: transform 0.6s ease-in-out;*/
    transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;
}

.img:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    /*黑色半透明*/
}

.content.s--signup .img:before {
    /*-webkit-transform: translate3d(640px, 0, 0);*/
    transform: translate3d(640px, 0, 0);
}

/*图片上的文字样式*/
.img__text {
    z-index: 2;
    position: absolute;
    left: 0;
    top: 50px;
    width: 100%;
    padding: 0 20px;
    text-align: center;
    color: #fff;
    transition: -webkit-transform 0.6s ease-in-out;
    transition: transform 0.6s ease-in-out;
    transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;
}

.img__text h2 {
    margin-bottom: 10px;
    font-weight: normal;
}

.img__text p {
    font-size: 14px;
    line-height: 1.5;
}

.img__text.m--in {
    /*-webkit-transform: translateX(-520px);*/
    transform: translateX(-640px);
}

.content.s--signup .img__text.m--up {
    -webkit-transform: translateX(520px);
    transform: translateX(640px);
}

.content.s--signup .img__text.m--in {
    -webkit-transform: translateX(0);
    transform: translateX(0);
}

.img__btn {
    overflow: hidden;
    z-index: 2;
    position: relative;
    width: 100px;
    height: 36px;
    margin: 0 auto;
    background: transparent;
    color: #fff;
    text-transform: uppercase;
    font-size: 15px;
    cursor: pointer;
}

.img__btn:after {
    content: '';
    z-index: 2;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: 2px solid #fff;
    border-radius: 30px;
}

.img__btn span {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    transition: -webkit-transform 0.6s;
    transition: transform 0.6s;
    transition: transform 0.6s, -webkit-transform 0.6s;
}

.img__btn span.m--in {
    /*-webkit-transform: translateY(-72px);*/
    transform: translateX(72px);
}

/*原始*/
.content.s--signup .img__btn span.m--in {
    -webkit-transform: translateY(0);
    transform: translateY(0);
}

/*点击后*/
.content.s--signup .img__btn span.m--up {
    -webkit-transform: translateY(72px);
    transform: translateX(-72px);
}

/*点击后*/

h2 {
    width: 100%;
    font-size: 26px;
    text-align: center;
}

label {
    display: block;
    width: 260px;
    margin: 20px auto 0;
    text-align: center;
}

#verify {
    display: flex;
    height: 35px;
    margin-top: 10px;
}

/*邮箱输入框*/
/*标签样式*/
label span {
    font-size: 16px;
    color: #909399;
    /*text-transform: uppercase;*/
}

/*输入样式*/
input {
    display: block;
    width: 100%;
    margin-top: 5px;
    padding-left: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    /*text-align: center;*/
}

input[type="email"] {
    margin-right: 10px;
    /* 给输入框和按钮之间增加一些间距 */
}

/*邮箱输入框*/
/*聚焦输入的样式*/
input:focus {
    border: 1px solid #d4af7a;
}

.forgot-pass {
    margin-top: 15px;
    text-align: center;
    font-size: 12px;
    color: #cfcfcf;
}

.forgot-pass a {
    color: #cfcfcf;
}

/*提交样式*/
.submit {
    margin-top: 40px;
    margin-bottom: 20px;
    background: #d4af7a;
    text-transform: uppercase;
}

label.submit {
    border: none;
    outline: none;
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
    font-size: 15px;
    display: block;
    margin: 0 auto;
    padding-top: 7px;
    width: 260px;
    height: 36px;
    border-radius: 30px;
    color: #fff;
    cursor: pointer;
}


.fb-btn {
    border: 2px solid #d3dae9;
    color: #8fa1c7;
}

.fb-btn span {
    font-weight: bold;
    color: #455a81;
}

/*登录*/
.sign-in {
    transition-timing-function: ease-out;
}

.content.s--signup .sign-in {
    transition-timing-function: ease-in-out;
    transition-duration: 0.6s;
    -webkit-transform: translate3d(640px, 0, 0);
    transform: translate3d(-640px, 0, 0);
}

/*注册*/
.sign-up {
    -webkit-transform: translate3d(-900px, 0, 0);
    transform: translate3d(-0px, 0, 0);
}

.content.s--signup .sign-up {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}

/*用户名密码提示*/
#usernameResult {
    color: red;
    margin-top: 5px;
    /* 增加一些间距 */
    text-align: center;
}
</style>