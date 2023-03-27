<template>
    <el-carousel 
        height="calc(100vh - 59px)" 
        direction="vertical" 
        :autoplay="false"
        v-if="loopLists.length"
        >
            <el-carousel-item v-for="item in loopLists" :key="item._id">
                <div 
                    class="product-item"
                    :style="{
                        backgroundImage:`url(http://localhost:3000${item.productCover})`
                    }"
                >
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">
                            <h2>{{item.title}}</h2>
                        </div>
                    </template>
                    <div>{{ item.introduction }}</div>
                    <div class="detail">{{ item.detail }}</div>
                    <div class="more">
                        <a href="#">详情请见...</a>
                    </div>
                </el-card>
                </div>
            </el-carousel-item>
    </el-carousel>

    <el-empty v-else description="暂无产品" style="height:calc(100vh - 59px)"></el-empty>
</template>

<script setup>
import axios from 'axios'
import {ref,onMounted} from 'vue'
const loopLists = ref([])
onMounted(async ()=>{
    const res = await axios.get('/webapi/product/lists').then(res=>res.data)
    console.log(res)
    loopLists.value = res.productLists
})
</script>

<style lang="scss" scoped>
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


.product-item{
    width: 100%;
    height: 100%;
    background-size: cover;
}

.box-card{
    width: 50%;
    height: 100%;
    background-color: rgba(255,255,255,.7);

    .detail,.more{
        margin-top: 20px;
    }
}


</style>
