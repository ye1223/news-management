<template>
    <div>
        <el-page-header content="添加产品" title="产品管理" icon=""></el-page-header>

        <el-card>
            <el-form ref="productFormRef" :model="productForm" :rules="productFormRules" label-width="120px" class="demo-ruleForm"
                status-icon>
                <el-form-item label="产品名称" prop="title">
                    <el-input v-model="productForm.title" />
                </el-form-item>
                <el-form-item label="产品摘要" prop="introduction">
                    <el-input v-model="productForm.introduction" type="textarea" />
                </el-form-item>
                <el-form-item label="产品详细" prop="detail">
                    <el-input v-model="productForm.detail" type="textarea"/>
                </el-form-item>
                

                <el-form-item label="头像" prop="productCover">

                    <Upload :avatarPath="productForm.productCover" @uploadOnChange="uploadOnChange"></Upload>

                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm">添加产品</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Upload from '@/components/upload/Upload.vue'
import upload from '@/util/upload'
import {useRouter} from 'vue-router'

const productFormRef = ref()
const productForm = reactive({
    title:'',
    introduction:'',
    detail:'',
    productCover:'',
    file:null
})
const productFormRules = reactive({
    title: [
        { required: true, message: '请输入标题', trigger: 'blur' },
        { min: 3, max: 20, message: '', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入摘要描述', trigger: 'blur' }
    ],
    detail: [
        { required: true, message: '请输入详细描述', trigger: 'blur' }
    ],
    productCover: [
        { required: true, message: '请输入介绍', trigger: 'blur' }
    ]
})


//每次选择完图片的回调
const uploadOnChange = (file) =>{
    productForm.productCover = URL.createObjectURL(file)
    productForm.file = file
}

const router = useRouter()
const submitForm = () =>{
    productFormRef.value.validate(async valid=>{
        if(valid){
            const res = await upload('/adminapi/product/add',productForm)
            if(res.ActionType === 'OK'){
                console.log('product',productForm)
                router.push('/product-manage/productlist')
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