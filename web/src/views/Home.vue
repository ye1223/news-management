<template>
     <div class="container">
        <el-carousel height="calc(100vh - 59px)">
            <el-carousel-item>
                <div :style="{
                    backgroundImage:`url(${require('@/assets/home1.jpg')})`
                    }">
                </div>
            </el-carousel-item> 
            <el-carousel-item>
                <div :style="{
                    backgroundImage:`url(${require('@/assets/home2.jpg')})`
                    }">
                </div>
            </el-carousel-item> 
            <el-carousel-item>
                <div :style="{
                    backgroundImage:`url(${require('@/assets/home3.jpg')})`
                    }">
                </div>
            </el-carousel-item> 
        </el-carousel>

        <div class="center">
            互联网+时代
        </div>
    </div>

    
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .el-carousel div{
        width: 100%;
        height: 100%;
        background-size: cover;
    }

    .container{
        position: relative;
        .center{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            height: 100px;
            line-height: 100px;
            color: #fff;
            font-size: 60px;
        }
    }
</style>