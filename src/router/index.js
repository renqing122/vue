import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/Test'
import Register from '@/components/main/Register'
import Login from '@/components/main/Login'
import Main from '@/components/main/Main'
import Add from '@/components/service/Add'
import ManageOrder from '@/components/service/ManageOrder'
import Order from '@/components/service/Order'
import Apply from '@/components/repairman/Apply'
import Find from '@/components/rent/Find'
import Smain from '@/components/service/Smain'
Vue.use(Router)

export default new Router({
  mode : 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/add',
      name: 'Add',
      component: Add
    },
    {
      path: '/manageorder',
      name: 'ManageOrder',
      component: ManageOrder
    },
    { 
      path: "/order", 
      name:'Order',
      component: Order 
    },
    { 
      path: "/apply", 
      name:'Apply',
      component: Apply 
    },
    { 
      path: "/find", 
      name:'Find',
      component: Find 
    },
    { 
      path: "/smain", 
      name:'Smain',
      component: Smain 
    },
  ]
})
