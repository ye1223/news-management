<template>
    <div>
        <el-page-header content="创建新闻" title="新闻管理" icon=""></el-page-header>

        <el-form ref="newsFormRef" :model="newsForm" :rules="newsFormRules" label-width="120px" class="demo-ruleForm"
            status-icon>
            <el-form-item label="标题" prop="title">
                <el-input v-model="newsForm.title" />
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <Editor> </Editor>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Editor from '@/components/editor/Editor.vue'
const newsFormRef = ref()
const newsForm = reactive({
    title: '', //标题
    content: '', //内容
    category: 1, //1最新动态 2典型案例 3通知公告
    coverPath: '', //封面地址信息
    file: null, //提交给后端二进制文件
    isPublish: false //false未发布 true已发布
})
const newsFormRules = reactive({
    title: [
        { require: true, message: '请输入新闻标题', trigger: 'blur' }
    ],
    content: [
        { require: true, message: '请输入新闻内容', trigger: 'blur' }
    ],
    category: [
        { require: true, message: '请选择新闻类别', trigger: 'blur' }
    ],
    coverPath: [
        { require: true, message: '请上传图片', trigger: 'blur' }
    ] 
})

</script>

<style lang="scss" scoped>
.el-form{
    margin-top: 50px;
}
</style>