<template>
    <div>
        <el-card>
            <el-page-header content="产品列表" title="产品管理" icon=""></el-page-header>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index" label="编号 " width="160"  />
                <el-table-column prop="title" label="标题"  />
                

                <el-table-column label="操作">
                    <template #default="scope">
                            <el-button 
                                size="small" 
                                @click="handleEdit(scope.row)"
                                circle
                                :icon="Edit"
                            ></el-button>


                            <el-popconfirm title="你确定要删除吗" confirm-button-text="确定" cancel-button-text="取消"
                                @confirm="handleDelete(scope.row)">
                                <template #reference>

                                    <el-button 
                                    size="small" 
                                    circle
                                    :icon="Delete"
                                    type="danger"
                                ></el-button>

                                </template>
                            </el-popconfirm>

                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script setup>
import axios from 'axios'
import {ref,onMounted} from 'vue'
import {Edit,Delete} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import {useStore} from 'vuex'
const store = useStore()
const router = useRouter()
const tableData = ref([])

onMounted(()=>{
     getTableData()
    //  console.log(tableData)
})
const getTableData = async ()=>{
    // 根据权限获取列表
    const res = await axios.get(`/adminapi/product/lists/${store.state.userInfo.userID}`).then(res=>res.data)
    console.log('resssss',res)
    tableData.value = res.productList
}


const handleDelete = async (item) =>{
    await axios.delete(`/adminapi/product/list/${item._id}`)
    await getTableData()
}

//编辑回调
const handleEdit = (item) =>{
    // 跳转到/news-manage/addnews/:id 带上需要编辑的id 
    router.push(`/product-manage/editproduct/${item._id}`)
}
</script>

<style lang="scss" scoped>
.el-card{
    margin-top: 50px;
}
::v-deep .htmlcontent{
    img{
        max-width: 100%;
    }
}
</style>