<template>
    <div>
        <el-page-header content="创建新闻" title="新闻管理" icon=""></el-page-header>

        <el-form ref="newsFormRef" :model="newsForm" :rules="newsFormRules" label-width="120px" class="demo-ruleForm"
            status-icon>
            <el-form-item label="标题" prop="title">
                <el-input v-model="newsForm.title" />
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <Editor @contentEvent="handleChange"> </Editor>
            </el-form-item>

            <el-form-item label="类别" prop="category">
                <el-select v-model="newsForm.category" class="m-2" placeholder="Select" size="large">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>

            <el-form-item label="封面" prop="cover">
                <Upload :avatarPath="newsForm.coverPath" @uploadOnChange="uploadOnChange"></Upload>
            </el-form-item>

            <el-form-item>
                    <el-button type="primary" @click="submitForm">添加新闻</el-button>
                </el-form-item>

        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Editor from '@/components/editor/Editor.vue'
import Upload from '@/components/upload/Upload.vue'
import upload from '@/util/upload'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
const store = useStore()
const router = useRouter()
const newsFormRef = ref()
const newsForm = reactive({
    title: '', //标题
    content: '', //内容
    category: 1, //1最新动态 2典型案例 3通知公告
    coverPath: '', //封面地址信息
    file: null, //提交给后端二进制文件
    isPublish: 0, //false未发布 true已发布
    userID:store.state.userInfo.userID
})
const newsFormRules = reactive({
    title: [
        { required: true, message: '请输入新闻标题', trigger: 'blur' }
    ],
    content: [
        { required: true, message: '请输入新闻内容', trigger: 'blur' }
    ],
    category: [
        { required: true, message: '请选择新闻类别', trigger: 'blur' }
    ],
    coverPath: [
        { required: true, message: '请上传图片', trigger: 'blur' }
    ] 
})
const options = [
    {
        label:'最新动态',
        value:1
    },
    {
        label:'典型案例',
        value:2
    },
    {
        label:'通知公告',
        value:3
    }
]

// Editor组件传值回调
const handleChange = (data) =>{
    //newHtml结构
    // console.log('Editor组件传来的',data)
    newsForm.content = data
}
// 图片上传回调
const uploadOnChange = (file) =>{
    newsForm.coverPath = URL.createObjectURL(file)
    newsForm.file = file
}

// 提交
const submitForm = () =>{
    newsFormRef.value.validate(async (valid)=>{
        if(valid){
            await upload('/adminapi/news/add',newsForm)
            router.push('/news-manage/newslist')
        }else{
            console.log('aaaaa')
        }
    })
}



</script>

<style lang="scss" scoped>
.el-form{
    margin-top: 50px;
}
</style>