<template>
    <div class="navbar">
        <el-menu
        :default-active="route.fullPath"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        :router="true"
    >
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/news-center">新闻中心</el-menu-item>
        <el-menu-item index="/product">产品与服务</el-menu-item>
        <el-menu-item index="" @click="handleLogin">登录</el-menu-item>
    </el-menu>
    
    <div class="right">
        企业门户官网
    </div>

    </div> 
</template>

<script setup>
import {useRoute} from 'vue-router'
const route = useRoute()

const handleLogin = () =>{
    location.href = 'http://localhost:8080'
}
</script>

<style lang="scss" scoped>
    .navbar{
        position: sticky;
        top: 0;
        left: 0;
        z-index: 1000;
    }
    .right{
        position:fixed;
        top: 0;
        right: 0;
        height: 59px;
        width:100px;
        line-height: 59px;
        text-align: center;
    }
</style>