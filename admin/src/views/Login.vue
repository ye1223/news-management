<template>
    <div>
        <Particles :particlesInit="particlesInit" id="tsparticles" :options="options" />

        <div class="formContainer">
            <h1>企业门户网站管理系统</h1>
            <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="loginRules" label-width="80px"
                class="loginForm">

                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username" type="text" autocomplete="off" />
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" type="password" autocomplete="off" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { loadFull } from "tsparticles"
import { reactive, ref } from 'vue'
import {useRouter} from 'vue-router'
import axios from 'axios'
import {ElMessage} from 'element-plus'
import {useStore} from 'vuex'

//表单绑定的响应式对象
const loginForm = reactive({
    username: '',
    password: '',
})

//表单的引用对象
const loginFormRef = ref()

const loginRules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 10, message: '请输入3-10位用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 10, message: '请输入3-10位密码', trigger: 'blur' }
    ]
})

const router = useRouter()
const store = useStore()

//提交表单函数
const submitForm = () =>{


    //1.校验表单
    loginFormRef.value.validate((valid)=>{//手动校验表单方法
        //  console.log(valid) //true or flase
        //  console.log(loginForm)
        

        axios.post('/adminapi/user/login',loginForm).then(res=>{
            console.log(res.data.ActionType)
            if(res.data.ActionType === 'OK'){
                // console.log(res.data.info)
                store.commit('changeUserInfo',res.data.info)
                store.commit('changeGetAllRouters',false) 
                router.push('/index')
                //localStorage.setItem('token','this is just a test token')
            }else{
                ElMessage.error('用户名密码不匹配')
            }
        })

         
    })
    //2.拿到表单内容，提交后台

    //3.设置token值
    //localStorage.setItem('token','this is just a test token')
}

const options = {
    background: {
        color: {
            value: '#EEEEEE'
        }
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: 'push'
            },
            onHover: {
                enable: true,
                mode: 'repulse'
            },
            resize: true
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40
            },
            push: {
                quantity: 4
            },
            repulse: {
                distance: 200,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: '#00ADB5'
        },
        links: {
            color: '#00ADB5',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
        },
        collisions: {
            enable: true
        },
        move: {
            direction: 'none',
            enable: true,
            outMode: 'bounce',
            random: false,
            speed: 3,
            straight: false
        },
        number: {
            density: {
                enable: true,
                area: 800
            },
            value: 80
        },
        opacity: {
            value: 0.5
        },
        shape: {
            type: 'circle'
        },
        size: {
            random: true,
            value: 5
        }
    },
    detectRetina: true
}
const particlesInit = async engine => {
    await loadFull(engine)
}


</script>

<style lang="scss" scoped>
    .formContainer{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;

        width: 600px;
        height: 400px;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background-color: rgba($color: #FAFAFA, $alpha: 0.6);
        color:050505;
        text-align: center; 
        border-radius: 40px;

        h1{
            margin-top: 20px;
        }
        .loginForm{
            margin:30px;
        }      
    }

    .el-form{
        display: block;
    }

    ::v-deep .el-form-item__label{
        font-size: 15px;
    }
</style> 