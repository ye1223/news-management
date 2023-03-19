<template>
    <el-header>
        <div class="left">
            <el-icon size="23px" @click="handleCollapse">
                <Menu />
            </el-icon>
            <span>企业门户网站管理系统</span>
        </div>
        <div class="right">
            <span>欢迎 {{ store.state.userInfo.username }} 回来</span>
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-icon size="30px"><User /></el-icon>
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
                        <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <!-- <button @click="handleCollapse">点击收缩/展开</button> -->
    </el-header>
</template>

<script setup>
//import store from '@/store/index'
import { Menu,User } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()

const handleCollapse = () => {
    //store.state.isCollapsed = !store.state.isCollapsed
    store.commit('changeCollapse')
}
const handleCenter = () =>{
     router.push('/center')
}
const handleLogout = () =>{
    localStorage.removeItem("token")
    store.commit('clearUserInfo')
    router.push('/login')
}
</script>

<style lang="scss">
.el-header {
    background-color: blanchedalmond;

    display: flex;
    height: 60px;
    line-height: 60px;
    justify-content: space-between;
    // align-items: center;
}

.left,.right{
    display: flex;
    
}
.left{
    i{
        margin:auto 15px;
        cursor: pointer;
    }

    span{
        font-size: 25px;
        font-weight: bold;
    }
}
.right{
    .el-dropdown{
        margin:auto 15px;
    } 
    span{
        font-size: 18px;
    }
}

</style>