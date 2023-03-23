//动态路由数组
import Home from '../views/home/Home'
import Center from '../views/center/Center'
import UserAdd from '../views/user-manage/UserAdd'
import UserList from '../views/user-manage/UserList'
import NewsAdd from '../views/news-manage/NewsAdd'
import NewsList from '../views/news-manage/NewsList'
import NewsEdit from '../views/news-manage/NewsEdit'
import ProductAdd from '../views/product-manage/ProductAdd'
import ProductList from '../views/product-manage/ProductList' 
import NotFound from '../views/notfound/NotFound'

const routes = [
    //主页
    {
        path:'/index',
        component:Home
    },
    //个人中心
    {
        path:'/center',
        component:Center
    },
    //用户管理
    {
        path:'/user-manage/adduser',
        component:UserAdd,
        requireAdminAuth:true
    },
    {
        path:'/user-manage/userlist',
        component:UserList,
        requireAdminAuth:true
    },
    //新闻管理
    {
        path:'/news-manage/addnews',
        component:NewsAdd
    },
    {
        path:'/news-manage/newslist',
        component:NewsList
    },
    {
        path:'/news-manage/editnews/:newsid',
        component:NewsEdit
    },
    //产品管理
    {
        path:'/product-manage/addproduct',
        component:ProductAdd
    },
    {
        path:'/product-manage/productlist',
        component:ProductList
    },
    {
        path:'/',
        redirect:'/index'
    },
    {
        path:'/:pathMatch(.*)*',
        component:NotFound
    }
]

export default routes