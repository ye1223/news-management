<template>
    <div>
        <el-page-header content="个人中心" title="企业门户网站管理系统" icon=""></el-page-header>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card>
                    <el-avatar :size="60" :src="avatarUrl"></el-avatar>
                    <h3>{{ store.state.userInfo.username }}</h3>
                    <h3>{{ store.state.userInfo.role === 1 ? '管理员' : '员工' }}</h3>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card>
                    <template #header>
                        <div>
                            <span>个人信息</span>
                        </div>
                    </template>

                    <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="120px"
                        class="demo-ruleForm" status-icon>
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="userForm.username" />
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <el-select v-model="userForm.gender" class="m-2" placeholder="Select" size="large">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="个人简介" prop="introduction">
                            <el-input v-model="userForm.introduction" type="textarea" />
                        </el-form-item>
                        <el-form-item label="头像" prop="avatarPath">

                            <Upload 
                                :avatarPath="userForm.avatarPath"
                                @uploadOnChange="uploadOnChange"
                            ></Upload>

                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm">更新</el-button>
                        </el-form-item>

                    </el-form>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import upload from '@/util/upload'
import Upload from '../../components/upload/Upload.vue'

const store = useStore()

const userFormRef = ref()
// vuex
const { username, gender, introduction, avatarPath } = store.state.userInfo
const userForm = reactive({
    username,
    gender,
    introduction,
    avatarPath,
    file: null
})

const userFormRules = reactive({
    username: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
        { min: 3, max: 10, message: '', trigger: 'blur' },
    ],
    gender: [
        { required: true, message: '请选择性别', trigger: 'blur' }
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
        label: '保密',
        value: 0
    },
    {
        label: '男',
        value: 1
    },
    {
        label: '女',
        value: 2
    }
]

const avatarUrl = computed(() =>
    store.state.userInfo.avatarPath ? `http://localhost:3000${store.state.userInfo.avatarPath}` : "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png")

const uploadOnChange = (file) =>{
    userForm.avatarPath = URL.createObjectURL(file)
    userForm.file = file
}


//更新提交
const submitForm = () => {
    userFormRef.value.validate(async valid => {
        if (valid) {
            /* ***************** */
            const res = await upload('/adminapi/user/upload', userForm)
            if (res.ActionType === 'OK') {
                store.commit('changeUserInfo', res.info)
                ElMessage.success('更新成功')
            }
        } else {
            ElMessage.error('something went wrong')
        }
    })
}
</script>

<style lang="scss" scoped>
.el-row {
    margin-top: 50px;
    text-align: center;
}
</style>

