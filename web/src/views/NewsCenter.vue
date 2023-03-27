<template>
    <div class="container">
        <div class="news-header" :style="{
            backgroundImage:`url(${require('@/assets/newsbg.jpg')})`
        }">
        </div>

        <div class="search">
            <el-popover
                placement="bottom"
                title="检索结果"
                width="50%"
                content=""
                :visible="visible"
            >
                <template #reference>
                    <el-input
                        v-model="searchText"
                        class="w-50 m-2"
                        placeholder="请输入新闻关键字"
                        :prefix-icon="Search"
                        type="search"
                        size="large"
                        @input="visible=true"
                        @blur="visible=false"
                    />
                </template>
                <!-- 搜索列表 -->
                <div v-if="searchNewsLists.length">
                    <div @click="handleChangePage(item._id)" v-for="item in searchNewsLists" :key="item._id" class="search-item">
                        {{ item.title }}
                     </div>
                </div>
                <div v-else >
                    <el-empty description="暂无新闻" :image-size="50"></el-empty>
                </div>
                
            </el-popover>
        </div>

        <div class="top-news">
            <el-row :gutter="20">
                <el-col 
                    :span="6"
                    v-for="item in topNewsLists" :key="item._id"
                >
                <!-- 热点新闻 -->
                <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="handleChangePage(item._id)" >
                    <div class="image" :style="{
                       backgroundImage:`url(http://localhost:3000${item.coverPath})` 
                    }">
                    </div>
                     <div style="padding: 14px">
                        <span>{{ item.title }}</span>
                        <div class="bottom">
                            <time class="time">{{ formatTime.getTime(item.editTime) }}</time>
                        </div>
                    </div>
                </el-card>
                </el-col>
            </el-row>
        </div>


        <el-tabs v-model="whichTab" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane 
                v-for="item in tabLists" 
                :key="item.name" 
                :label="item.label" 
                :name="item.name"
            >

            <el-row :gutter="20">
                <el-col :span="18">
                    <div v-for="data in tabnews[item.name]" :key="data._id" style="padding:14px;">
                        <!-- tab新闻 -->
                        <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="handleChangePage(data._id)">
                            <div class="tab-image" :style="{
                            backgroundImage:`url(http://localhost:3000${data.coverPath})` 
                            }">
                            </div>
                            <div style="padding: 14px; float: left;">
                                <span>{{ data.title }}</span>
                                <div class="bottom">
                                    <time class="tab-time">{{ formatTime.getTime(data.editTime) }}</time>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </el-col> 

                <el-col :span="6">
                    <el-timeline>
                        <el-timeline-item
                        v-for="(data, index) in tabnews[item.name]"
                        :key="index"
                        :timestamp="formatTime.getTime(data.editTime)"
                        >
                        {{ data.title }}
                        </el-timeline-item>
                    </el-timeline>
                </el-col>
            </el-row>

            
            </el-tab-pane>
        
        </el-tabs>

        <el-backtop :visibility-height="100" :right="100" :bottom="100" />
    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import {ref,onMounted,computed} from 'vue'
import axios from 'axios'
import formatTime from '@/util/formatTime'
import _ from 'lodash'
import {useRouter} from 'vue-router'
const searchText = ref('')
const visible = ref(false)
const newsLists = ref([])
const searchNewsLists = computed(()=>searchText.value?newsLists.value.filter(item=>item.title.includes(searchText.value)):[])
const topNewsLists = computed(()=>newsLists.value.slice(0,4))
const whichTab = ref(1)
const tabLists = [
    {
        label:'最新动态',
        name:1
    },
    {
        label:'典型案例',
        name:2
    },
    {
        label:'通知公告',
        name:3
    },
]

onMounted( async ()=>{
    const res = await axios.get('/webapi/news/lists').then(res=>res.data)
    console.log('新闻列表？？',res)
    newsLists.value = res.newsLists
    console.log(newsLists)
})

const tabnews = computed(()=>_.groupBy(newsLists.value,item=>item.category))
console.log('tabnews',tabnews)


const router = useRouter()
const handleChangePage = (newsid) =>{
    // console.log(newsid)
    router.push(`/news/${newsid}`)
}


</script>

<style lang="scss" scoped>
.container{
    position: relative;
    .news-header{
        width: 100%;
        height: 400px;
        background-size: cover;
    }

    .search{
        position: absolute;
        top:20%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 100%;
        text-align: center;
        .el-input{
            width: 50%;
        }

        div .search-item{
            height: 50px;
            line-height: 50px;
            background-color: red;
            &:hover{
                background-color: whitesmoke;
                color:aqua ;
            }
        }
    }

    .top-news{
        margin: 20px;

        .image{
            width: 100%;
            height: 150px;
        }
        .time{
            font-size: 13px;
            color:gray;
        }
    }

    .el-tabs{
        margin: 20px;

        
        .tab-image{
            width: 200px;
            height: 100px;
            background-size: cover;
            float: left;
        }

        .tab-time{
            font-size: 13px;
            color: gray;
        }
        
    }
}
</style>