<template>
    <div>
        <el-card>
            <el-page-header content="用户列表" title="用户管理" icon=""></el-page-header>
        </el-card>

        <el-card style="width:100%;">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index" label="编号 " width="180" />
                <el-table-column prop="username" label="用户名" width="180" />
                <el-table-column prop="gender" label="性别" width="180" />
                <el-table-column label="角色">
                    <template #default="scope">
                        <el-tag v-if="scope.row.role === 1" type="success">
                            管理员
                        </el-tag>

                        <el-tag v-else>
                            编辑
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="introduction" label="简介" />
                <el-table-column label="头像" width="180">
                    <template #default="scope">
                        <div v-if="scope.row.avatarPath">
                            <el-avatar size="50px" :src="`http://localhost:3000${scope.row.avatarPath}`"></el-avatar>
                        </div>

                        <div v-else>
                            <el-avatar size="50px"
                                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">
                
                            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            
                        <el-popconfirm title="你确定要删除吗" confirm-button-text="确定" cancel-button-text="取消"
                            @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button size="small" type="danger">删除</el-button>
                            </template>
                        </el-popconfirm>


                    </template>
                </el-table-column>
                <!-- <el-table-column v-for="item,index in tableData" :key="item." prop="item.gender" label="item.introduction" /> -->
            </el-table>
        </el-card>

        

        <el-dialog v-model="dialogVisible" title="编辑信息" width="50%" :before-close="handleClose">


            <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="120px" class="demo-ruleForm"
                status-icon>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userForm.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userForm.password" type="password" placeholder="如果不修改密码，则默认使用原密码！" />
                </el-form-item>
                <el-form-item label="角色" prop="role">
                    <el-select v-model="userForm.role" class="m-2" placeholder="Select" size="large">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="个人简介" prop="introduction">
                    <el-input v-model="userForm.introduction" type="textarea" />
                </el-form-item>
            </el-form>

            
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleEditConfirm">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue'

// 编辑弹出框可见性
const dialogVisible = ref(false)

//自动更新列表钩子
onMounted(() => {
    getTableData()
})
let tableData = ref([])
const getTableData = async () => {
    const res = await axios.get('adminapi/user/list').then(res => res.data)
    //    console.log(res.listData)
    if (res.ActionType === 'OK') {
        tableData.value = res.listData
        // tableData.push(Array.from(new Set(res.listData)))  //reactive数组会直接丢失响应式，需要用push方法
        // console.log(tableData[0])

        /* for (let index in tableData) {
            // console.log(tableData[item])
            tableData[index].role === 1 ? tableData[index].role = '管理员' : tableData[index].role = '编辑'
        } */
    } else {
        console.log('获取列表失败')
    }
}

const userFormRef = ref()
let userForm = reactive({
    username:'',
    password:'',
    role:0,
    introduction:''
})

const userFormRules = reactive({
    username: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
        { min: 3, max: 10, message: '', trigger: 'blur' },
    ],
    password: [
        { required: false, message: '请输入密码', trigger: 'blur' }
    ],
    introduction: [
        { required: true, message: '请输入介绍', trigger: 'blur' }
    ],
    role: [
        { required: true, message: '请选择角色', trigger: 'blur' }
    ],

})

const options = [
    {
        label: '编辑',
        value: 2
    },
    {
        label: '管理员',
        value: 1
    }
]

const handleEdit = async (data) => {
    console.log(data)
    const res = await axios.get(`/adminapi/user/list/${data._id}`).then(res=>res.data)
    if(res.ActionType==='OK'){
        // console.log('编辑的一条',res.listData)
        
        Object.assign(userForm,{...res.listData[0]})//reactive对象数据直接赋值会丢失响应式

        // console.log(userForm)
    }

    dialogVisible.value = true


}

const handleEditConfirm = () =>{

    userFormRef.value.validate(async (valid)=>{
        if(valid){
            console.log(userForm)
            // 1 更新后端数据
            await axios.put(`/adminapi/user/list/${userForm._id}`,userForm)
            // 2 关闭编辑窗口
            dialogVisible.value = false
            // 3 更新列表
            // 关闭编辑窗口
            getTableData()
        }
        
    })
    
}

const handleDelete = async (data) => {
    // console.log(data._id)
    await axios.delete(`/adminapi/user/list/${data._id}`)

    //重新获取一次tableData，因为是响应式，所以自动刷新data、page
    getTableData()
}




</script>

<style scoped>
.el-card {
    width: 50%;
}
</style>