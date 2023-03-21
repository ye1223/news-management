<template>
    <div>
        <el-card>
            <el-page-header content="用户列表" title="用户管理" icon=""></el-page-header>
        </el-card>

        <el-card style="width:100%;">
            <el-table :data="tableData" style="width: 100%" key="1">
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
                        <el-popconfirm title="你确定要编辑吗">
                            <template #reference>
                                <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                            </template>
                        </el-popconfirm>
                        <el-popconfirm title="你确定要删除吗">
                            <template #reference>
                                <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                            </template>
                        </el-popconfirm>
                        
                        
                    </template>
                </el-table-column>
                <!-- <el-table-column v-for="item,index in tableData" :key="item." prop="item.gender" label="item.introduction" /> -->
            </el-table>
        </el-card>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue'

onMounted(() => {
    getTableData()
})
let tableData = reactive([])



const getTableData = async () => {
    const res = await axios.get('adminapi/user/list').then(res => res.data)
    //    console.log(res.listData)
    if (res.ActionType === 'OK') {
        // tableData.value = res.listData
        tableData.push(...res.listData)  //reactive数组会直接丢失响应式，需要用push方法
        // console.log(tableData[0])

        /* for (let index in tableData) {
            // console.log(tableData[item])
            tableData[index].role === 1 ? tableData[index].role = '管理员' : tableData[index].role = '编辑'
        } */
    } else {
        console.log('获取列表失败')
    }
}


const handleEdit = (data) => {
    console.log(data)
}
const handleDelete = (data) => {
    console.log(data)
}


</script>

<style>
.el-card {
    width: 50%;
}
</style>