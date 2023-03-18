<template>
    <!-- 侧边栏 展开200px 收回64px -->
    <el-aside :width="$store.state.isCollapsed?'64px':'200px'" >

        <el-menu 
        :collapse="$store.state.isCollapsed" 
        :collapse-transition="false" 
        :router="true"
        :default-active="route.fullPath"
        >
            <!-- index为唯一标识,配合router属性，路由跳转  -->
            <el-menu-item index="/index">
                <el-icon><HomeFilled /></el-icon>
                <span>首页</span>
            </el-menu-item>

            <el-menu-item index="/center">
                <el-icon><Avatar /></el-icon>
                <span>个人中心</span>
            </el-menu-item>

            <el-sub-menu index="/user-manage">
                <template #title>
                    <el-icon><UserFilled /></el-icon>
                    <span>用户列表</span>
                </template>
                <el-menu-item index="/user-manage/adduser">添加用户</el-menu-item>
                <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="/news-manage">
                <template #title>
                    <el-icon><List /></el-icon>
                    <span>新闻管理</span>
                </template>
                <el-menu-item index="/news-manage/addnews">添加新闻</el-menu-item>
                <el-menu-item index="/news-manage/newslist">新闻列表</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="/product-manage">
                <template #title>
                    <el-icon><Shop /></el-icon>
                    <span>产品管理</span>
                </template>
                <el-menu-item index="/product-manage/addproduct">添加产品</el-menu-item>
                <el-menu-item index="/product-manage/productlist">产品列表</el-menu-item>
            </el-sub-menu>

            
        </el-menu>
    </el-aside>
</template>

<script setup>
import {HomeFilled,Avatar,UserFilled,List,Shop} from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';
const route = useRoute()
//console.log('route',route.fullPath) //当前路由路径
</script>

<style lang="scss">
.el-aside {
    height: 100vh;
    background-color: antiquewhite;
}
</style>