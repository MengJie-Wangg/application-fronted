<template>
    <div class="login">
        <el-form ref="loginRef" class="login-form" :rules="loginRules" :model="loginForm">
            <h3 class="title">管理系统</h3>
            <el-form-item prop="username">
                <el-input v-model="loginForm.username" style="padding-bottom: 10px;" size="large" placeholder="账号">
                    <template #prefix>
                        <el-icon :size="15">
                            <User />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="loginForm.password" style="padding-bottom: 10px;" size="large" placeholder="密码">
                    <template #prefix>
                        <el-icon :size="15">
                            <Lock />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="loginForm.code" size="large" style="width: 66%;" placeholder="验证码">
                    <template #prefix>
                        <el-icon :size="15">
                            <Location />
                        </el-icon>
                    </template>
                </el-input>
                <div class="login-code"><img @click="getCode" :src="codeUrl" class="login-code-img" /></div>
            </el-form-item>
            <el-checkbox v-model="loginForm.rememberMe" style="margin: 0px 0px 15px 0px;">记住密码</el-checkbox>
            <el-form-item>
                <el-button @click="handleLogin()" style="width: 100%;" size="large" type="primary">登 录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="js">
import { User, Lock } from '@element-plus/icons-vue'
import { ref, getCurrentInstance, watch } from 'vue'
import { getCodeImg, login } from '@/api/login';
import {useUserStore} from '@/store/modules/user'
import { useRouter,useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const redirect = ref(undefined);
//路由跳转时获取redirect参数
watch(route,newRoute =>{
    redirect.value = newRoute.query && newRoute.query.redirect;
},{immediate:true});
//验证码图片地址
const codeUrl = ref('');
//登录表单
const loginForm = ref({
    username: 'admin',
    password: 'admin123',
    rememberMe: false,
    code: '',
    uuid: ''
})
const { proxy } = getCurrentInstance();
//获取验证码
function getCode() {
    getCodeImg().then(res => {
        codeUrl.value = 'data:image/gif;base64,' + res.img;
        loginForm.value.uuid = res.uuid;
    });
}
//登录
function handleLogin() {
    console.log(loginForm.value);
    proxy.$refs.loginRef.validate((valid) => {
        if (valid) {
            userStore.login(loginForm.value).then(res => {
                router.push(redirect.value || '/');
            }).catch(err => {
                getCode();
            })
        } else {
            console.log('error submit!!');
        }
    })
}
//登录表单校验
const loginRules = ref({
    username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    code: [{ required: true, message: '请输入验证码', trigger: 'change' }]
})
const userStore = useUserStore();
getCode();
</script>


<style scoped lang="scss">
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url('@/assets/images/login-background.jpg');
    background-size: cover;
}

.login-form {
    background-color: #fff;
    width: 400px;
    padding: 25px 25px 5px 25px;
    border-radius: 6px;

    .title {
        text-align: center;
        color: #707070;
        margin: 0px auto 30px 0px;
    }

    .login-code {
        width: 33%;
        height: 40px;

        .login-code-img {
            height: 40px;
            padding-left: 12px;
            cursor: pointer;
        }
    }
}
</style>