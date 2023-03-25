<template>
    <div>
        <el-card>
            <el-page-header content="新闻列表" title="新闻管理" icon=""></el-page-header>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index" label="编号 " width="160"  />
                <el-table-column prop="title" label="标题"  />
                <el-table-column label="分类" >
                    <template #default="scope">
                        {{ categoryFormat(scope.row.category) }}
                    </template>
                </el-table-column>
                <el-table-column label="更新时间" >
                    <template #default="scope">
                        {{ formatTime.getTime(scope.row.editTime) }}
                    </template>
                </el-table-column>
                
                <el-table-column prop="" label="是否发布">
                    <template #default="scope">
                        <!-- 默认识别绑定布尔类型 -->
                        <el-switch v-model="scope.row.isPublish" @click="handleSwitchChange(scope.row)" :active-value="1" :inactive-value="0" />
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">
                
                            <el-button 
                                size="small" 
                                circle
                                :icon="View"
                                type="success"
                                @click="handlePreview(scope.row)"
                            ></el-button>
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


        <el-dialog
            v-model="dialogVisible"
            title="预览新闻"
            width="50%"
        >
            <div>
                <h2>{{ previewData.title }}</h2>
                <div style="color:gray;">{{ formatTime.getTime(previewData.editTime) }}</div>
                <el-divider>
                    <el-icon><Message/></el-icon>
                </el-divider>
                <div v-html="previewData.content" class="htmlcontent"></div>
            </div>
            
        </el-dialog>
    </div>
</template>

<script setup>
import axios from 'axios'
import {ref,onMounted} from 'vue'
import formatTime from '@/util/formatTime'
import {Edit,View,Delete,Message} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import {useStore} from 'vuex'
const store = useStore()
const router = useRouter()
const tableData = ref([])
const previewData = ref({})
const dialogVisible = ref(false)

onMounted(()=>{
     getTableData()
    //  console.log(tableData)
})
const getTableData = async ()=>{
    // 根据权限获取列表
    const res = await axios.get(`/adminapi/news/lists/${store.state.userInfo.userID}`).then(res=>res.data)
    console.log('resssss',res)
    tableData.value = res.newsList
}

const categoryFormat = (category) =>{
    /* if(category===1){
        return '最新动态'
    }else if(category === 2){
        return '典型案例'
    }else{
        return '通知公告'
    } */
    const categoryArr = ['最新动态', '典型案例','通知公告']
    return categoryArr[category-1]
}

// 开关回调 （isPublish）
const handleSwitchChange = async (item) =>{
    // console.log(item)
    await axios.put('/adminapi/news/publish',{
        _id:item._id,
        isPublish:item.isPublish
    })
     getTableData()
}

// 预览回调
const handlePreview = (item) =>{
    previewData.value = item
    dialogVisible.value = true
    console.log(previewData.value)
}

const handleDelete = async (item) =>{
    // console.log(item)
    await axios.delete(`/adminapi/news/list/${item._id}`)
    await getTableData()
}

//编辑回调
const handleEdit = (item) =>{
    // 跳转到/news-manage/addnews/:id 带上需要编辑的id 
    router.push(`/news-manage/editnews/${item._id}`)
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