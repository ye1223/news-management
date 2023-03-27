<template>
    <el-row>
        <el-col :span="16" :offset="1">
            <div>
                <h2>{{ currentNews.title }}</h2>

                <div class="time">
                    {{ formatTime.getTime(currentNews.editTime) }}
                </div>

                <el-divider>
                    <el-icon><star-filled /></el-icon>
                </el-divider>

                <!-- xss跨站脚本攻击 -->
                <div v-html="currentNews.content"></div>

            </div>
        </el-col>


        <el-col :span="5" :offset="2" :pull="1">
           <el-card class="box-card">
                <template #header>
                <div class="card-header">
                    <span style="font-size: 16px; font-weight: bold;">最近新闻</span>
                </div>
                </template>
                <div 
                    v-for="item in topNews" 
                    :key="item._id" 
                    style="margin:10px 0"
                    @click="handleChangePage(item._id)"
                    >
                        <div>{{ item.title }}</div>
                        <div style="font-size: 13px; color: gray;">{{ formatTime.getTime(item.editTime) }}</div>
                </div>
                
            </el-card> 
        </el-col>
    </el-row>
</template>

<script setup>
import { onMounted,ref ,watchEffect ,onBeforeUnmount} from 'vue'
import axios from 'axios'
import { useRoute,useRouter } from 'vue-router'
import formatTime from '@/util/formatTime'
import { StarFilled } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const currentNews = ref({})
const topNews = ref([])

const stop = watchEffect(async () => {
    if(!route.params.newsid) return 
    // console.log(route.params.newsid)
    const res = await axios.get(`/webapi/news/list/${route.params.newsid}`).then(res=>res.data)
    console.log('res',res)
    const res2 = await axios.get('/webapi/news/top-lists?limit=4').then(res=>res.data)
    // console.log(res.newsLists[0])
    currentNews.value = res.newsLists[0]
    // console.log(res2.topNewsLists)
    topNews.value = res2.topNewsLists   
})
onBeforeUnmount(()=>{
    stop()
})

const handleChangePage = (newsid) =>{
    router.push(`/news/${newsid}`)
}
</script>

<style lang="scss" scoped>
    .el-row{
        margin-top: 30px;

        .time{
            font-size: 13px;
            color:gray;
        }
    }
</style>