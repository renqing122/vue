import App from '../app'
/**
 * auth true登录才能访问，false不需要登录，默认true
 */
export default [
    {
        path: '/',
        component: App,
        children: [
            
            {
                meta: { auth: false },
                path: '/signout', //退出
                component: resolve => require(['../pages/signout/'], resolve)
            }, 
            {
              meta: { auth: false },
              path: '/order', //订单
              component: resolve => require(['../pages/order/'], resolve)
            },
            {
              meta: { auth: false },
              path: '/orderchange', //订单
              component: resolve => require(['../pages/orderchange/'], resolve)
            },
            {
                meta: { auth: false },
                path: '/home', //个人主页
                component: resolve => require(['../pages/home/'], resolve)
            },
            {
                path: '/index', //首页
                meta: { auth: false },
                component: resolve => require(['../pages/index/'], resolve)
            },
            {
              meta: { auth: false },
              path: '/register', //注册
              component: resolve => require(['../pages/register/'], resolve)
            },
            {
              meta: { auth: false },
              path: '/user', //用户主页
              component: resolve => require(['../pages/user/'], resolve)
            },
            {
              meta: { auth: false },
              path: '/login', //登录
              component: resolve => require(['../pages/login/'], resolve)
            },
            {
              meta: { auth: false },
              path: '/customerservice', //客服主页
              component: resolve => require(['../pages/customerservice/'], resolve)
            },
            {
              meta: { auth: false },
              path: '/userimformation', //用户信息界面
              component: resolve => require(['../pages/user/userimformation'], resolve)
            },
            {
              meta: { auth: false },
              path: '/administrator', //客服主页
              component: resolve => require(['../pages/administrator/'], resolve)
            },

            
        ]
    }
]