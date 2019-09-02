import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main/Main'
import Test from '@/components/Test'
import RentLogin from '@/components/rent/RentLogin'
import RentRegister from '@/components/rent/RentRegister'
import SerLogin from '@/components/service/SerLogin'
import SerRegister from '@/components/service/SerRegister'
import RepLogin from '@/components/repairman/RepLogin'
// import Apply from '@/components/service/Apply'
import ManageOrder from '@/components/service/ManageOrder'
import Add from '@/components/service/Add'
import Order from '@/components/rent/Order'
import Rlogin from '@/components/root/Rlogin'
// import Find from '@/components/rent/Find'
import CheckOrder from '@/components/service/CheckOrder'
import AddService from '@/components/root/AddService'
import AddRepairman from '@/components/service/AddRepairman'
import MyOrder from '@/components/rent/MyOrder'
import Repair from '@/components/rent/Repair'
import Complain from '@/components/rent/Complain'
import Smain from '@/components/service/Smain'
import Rmain from '@/components/rent/Rmain'
import SInformation from '@/components/service/SInformation'
import RInformation from '@/components/rent/RInformation'
import ManageReport from '@/components/service/ManageReport'
import SelectRepairman from '@/components/service/SelectRepairman'
import Detail from '@/components/rent/Detail'
import Contract from '@/components/main/Contract'
import MyReport from '@/components/rent/MyReport'
import MyComplain from '@/components/rent/MyComplain'
import ManageComplain from '@/components/service/ManageComplain'
import GetReport from '@/components/repairman/GetReport'
import CompletedReport from '@/components/repairman/CompletedReport'
import ManageHouse from '@/components/service/ManageHouse'
import ManageRInformation from '@/components/service/ManageRInformation'
import SDetail from '@/components/service/SDetail'
import SOrder from '@/components/service/SOrder'
import MOrder from '@/components/main/SOrder'
import MDetail from '@/components/main/SDetail'

Vue.use(Router)

export default new Router({
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
    {//租客登录
      path: '/rentlogin',
      name: 'RentLogin',
      component: RentLogin
    },
    {//租客注册
      path: '/rentregister',
      name: 'RentRegister',
      component :RentRegister
    },
    {//租客主页
      path: '/rmain/:tenantId',
      name: 'Rmain',
      component: Rmain,
      props: true
    },
    {//客服登录
      path: '/serlogin',
      name: 'SerLogin',
      component: SerLogin
    },
    {//客服注册
      path: '/serregister',
      name: 'SerRegister',
      component :SerRegister
    },

    {//师傅登录
      path: '/replogin',
      name: 'RepLogin',
      component: RepLogin
    },
    {//客服主页
      path: '/smain/:operatorId',
      name: 'Smain',
      component: Smain,
      props: true
    },
    {//导入房间信息
      path: '/add/:operatorId',
      name: 'Add',
      component: Add,
      props: true
    },
    {//租客查看房源
      path: '/order/:tenantId',
      name: 'Order',
      component: Order,
      props: true
    },
    {//管理员登录
      path: '/rlogin',
      name: 'Rlogin',
      component: Rlogin,
    },
    {//客服管理订单
      path: '/manageorder/:operatorId',
      name: 'ManageOrder',
      component: ManageOrder,
      props: true
    },
    {//客服审核订单
      path: '/checkorder/:operatorId',
      name: 'CheckOrder',
      component: CheckOrder,
      props: true
    },
    {//审核客服
      path: '/addservice/:rootname',
      name: 'AddService',
      component: AddService,
      props: true
    },
    {//增加师傅
      path: '/addrepairman/:operatorId',
      name: 'AddRepairman',
      component: AddRepairman,
      props: true
    },
    {//租客查询我的订单
      path: '/myorder/:tenantId',
      name: 'MyOrder',
      component: MyOrder,
      props: true
    },
    {//添加投诉
      path: '/complain/:orderId',
      name: 'Complain',
      component: Complain,
      props: true
    },
    {//添加报修
      path: '/repair/:orderId',
      name: 'Repair',
      component: Repair,
      props: true
    },
    {//租户修改信息
      path: '/rinformation/:tenantId',
      name: 'RInformation',
      component: RInformation,
      props: true
    },
    {//客服修改信息
      path: '/sinformation/:operatorId',
      name: 'SInformation',
      component: SInformation,
      props: true
    },
    {//管理报修单
      path: '/managereport/:operatorId',
      name: 'ManageReport',
      component: ManageReport,
      props: true
    },
    {//选择师傅
      path: '/selectrepairman/:fixOrderId/:operatorId',
      name: 'SelectRepairman',
      component: SelectRepairman,
      props: true
    },
    {//租客房间详情页
      path: '/detail/:tenantId/:roomId',
      name: 'Detail',
      component: Detail,
      props: true
    },
    {//客服订房
      path: '/sdetail/:roomId/:operatorId',
      name: 'SDetail',
      component: SDetail,
      props: true
    },
    {//导出合同
      path: '/contract/:orderId',
      name: 'Contract',
      component: Contract,
      props: true
    },
    {//租户查看报修
      path: '/myreport/:tenantId',
      name: 'Myreport',
      component: MyReport,
      props: true
    },
    {//租户查看投诉
      path: '/mycomplain/:tenantId',
      name: 'MyComplain',
      component: MyComplain,
      props: true
    },
    {//师傅查看已完成维修订单
      path: '/completedreport/:repairmanId',
      name: 'CompletedReport',
      component: CompletedReport,
      props: true
    },
    {//师傅查看未完成维修订单
      path: '/getreport/:repairmanId',
      name: 'GetReport',
      component: GetReport,
      props: true
    },
    {//客服查看投诉
      path: '/managecomplain/:operatorId',
      name: 'ManageComplain',
      component: ManageComplain,
      props: true
    },
    {//客服管理房源
      path: '/managehouse/:operatorId',
      name: 'ManageHouse',
      component: ManageHouse,
      props: true
    },
    {//客服查看用户信息
      path: '/managerinformation/:operatorId',
      name: 'ManageRInformation',
      component: ManageRInformation,
      props: true
    },
    {//客服查看房源
      path: '/sorder/:operatorId',
      name: 'SOrder',
      component: SOrder,
      props: true
    },
    {
      path: '/morder',
      name: 'MOrder',
      component: MOrder,
      props: true
    },
    {
      path: '/mdetail/:roomId',
      name: 'MDetail',
      component: MDetail,
      props: true
    }
  ]
})
