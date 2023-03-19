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
                        class="demo-ruleForm" :size="formSize" status-icon>
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
                        <el-form-item label="头像" prop="avatar">
                            <el-upload class="avatar-uploader"
                                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                                :show-file-list="false"
                                :auto-upload="false"
                                :onchange="handleChange"
                            >
                                <img v-if="userForm.avatar" :src="userForm.avatar" class="avatar" />
                                <el-icon v-else class="avatar-uploader-icon">
                                    <Plus />
                                </el-icon>
                            </el-upload>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @clcik="submitForm()">更新</el-button>
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
import { Plus } from '@element-plus/icons-vue'
const store = useStore()
const avatarUrl = computed(() => store.state.userInfo.avatar ? store.state.userInfo.avatar : "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png")

const userFormRef = ref()
const { username, gender, introduction, avatar } = store.state.userInfo
const userForm = reactive({
    username,
    gender,
    introduction,
    avatar
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
    avatar: [
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

//每次选择完图片的回调
const handleChange = (file) =>{
    console.log(file.target.files[0])
    userForm.avatar = URL.createObjectURL(file.target.files[0])
}
</script>

<style lang="scss" scoped>
.el-row {
    margin-top: 50px;
    text-align: center;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar{
  width: 178px;
  height: 178px;
}
</style>