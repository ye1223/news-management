<template>
    <div>
        <el-page-header content="添加用户" title="用户管理" icon=""></el-page-header>

        <el-card>
            <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="120px" class="demo-ruleForm"
                status-icon>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userForm.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userForm.password" type="password" />
                </el-form-item>
                <el-form-item label="角色" prop="role">
                    <el-select v-model="userForm.role" class="m-2" placeholder="Select" size="large">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="个人简介" prop="introduction">
                    <el-input v-model="userForm.introduction" type="textarea" />
                </el-form-item>

                <el-form-item label="头像" prop="avatar">

                    <Upload :avatarPath="userForm.avatarPath" @uploadOnChange="uploadOnChange"></Upload>

                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm">添加用户</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Upload from '@/components/upload/Upload.vue'
import upload from '@/util/upload'
import {useRouter} from 'vue-router';

const userFormRef = ref()
const userForm = reactive({
    usename: '',
    password: '',
    role: 2,//1管理员，2编辑
    introduction: '',
    avatarPath: '',
    file: null,
    gender:0 //保密
})
const userFormRules = reactive({
    username: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
        { min: 3, max: 10, message: '', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    role: [
        { required: true, message: '请选择权限', trigger: 'blur' }
    ],
    introduction: [
        { required: true, message: '请输入介绍', trigger: 'blur' }
    ],
    avatarPath: [
        { required: true, message: '请上传头像', trigger: 'blur' }
    ],

})

const options = [
    {
        label: '管理员',
        value: 1
    },
    {
        label: '编辑',
        value: 2
    }
]

//每次选择完图片的回调
const uploadOnChange = (file) =>{
    userForm.avatarPath = URL.createObjectURL(file)
    userForm.file = file
}

const router = useRouter()
const submitForm = () =>{
    userFormRef.value.validate(async valid=>{
        if(valid){
            console.log(userForm)
            const res = await upload('/adminapi/user/add',userForm)
            if(res.ActionType === 'OK'){
                console.log('成功添加新成员捏')
                router.push('/user-manage/userlist')
            }else{
                console.log('something went wrong ？')
            }
              
        }
    })
    
}

</script>

<style lang="scss" scoped>
.el-card {
    margin-top: 50px;
    width: 70%;
    margin-left: calc(15%);
}

.el-input {
    width: 50%;
}
</style>