import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main/Main'
import Test from '@/components/Test'
import Login from '@/components/main/Login'
import Register from '@/components/main/Register'
import Apply from '@/components/service/Apply'
import ManageOrder from '@/components/service/ManageOrder'
import Add from '@/components/service/Add'
import Order from '@/components/service/Order'
import Rlogin from '@/components/root/Rlogin'
// import Find from '@/components/rent/Find'
import CheckOrder from '@/components/service/CheckOrder'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {//主页
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {//注册
      path: '/login',
      name: 'Login',
      component: Login
    },
    {//登录
      path: '/register',
      name: 'Register',
      component :Register
    },
    {//添加师傅
      path: '/apply',
      name: 'Apply',
      component: Apply
    },
    {//导入房间信息
      path: '/add',
      name: 'Add',
      component: Add
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {//管理员登录
      path: '/rlogin',
      name: 'Rlogin',
      component: Rlogin
    },
    {//客服管理订单
      path: '/manageorder',
      name: 'ManageOrder',
      component: ManageOrder
    },
    // {//租客查询可租房间
    //   path: '/find',
    //   name: 'Find',
    //   component: Find
    // },
    {//客服审核订单
      path:'/checkorder',
      name: 'CheckOrder',
      component: CheckOrder
    }
  ]
})
