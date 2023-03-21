<template>
    <div>
        <el-page-header content="首页" title="企业门户网站管理系统" icon=""></el-page-header>

        <el-card class="box-card">
            <el-row>
                <el-col :span="4">
                <el-avatar :size="50" :src="avatarUrl"></el-avatar>
                </el-col>
                <el-col :span="20">
                    <h3>欢迎{{ store.state.userInfo.username }},{插入一些文字，或丢弃}</h3>
                </el-col>
            </el-row>
        </el-card>

        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>公司产品</span>

                        <el-carousel :interval="4000" type="card" height="200px">
                            <el-carousel-item v-for="item in 6" :key="item">
                                <h3 text="2xl" justify="center">{{ item }}</h3>
                            </el-carousel-item>
                        </el-carousel>
                
                </div>
            </template>
        </el-card>

    </div>
</template>

<script setup>
import {useStore} from 'vuex'
import { computed } from 'vue'
const store = useStore()
const avatarUrl = computed(()=>store.state.userInfo.avatarPath?`http://localhost:3000${store.state.userInfo.avatarPath}`:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png")
/* import { useStore } from 'vuex'
import axios from 'axios'
axios.get('/adminapi/user/home').then(res=>{
    console.log(res.data)
})

const store = useStore()
console.log('--test--store',store.state) */

</script>

<style lang="scss" scoped>
.box-card {
    margin-top: 50px;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>