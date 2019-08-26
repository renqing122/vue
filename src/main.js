import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'

import routes from './config/routes'
import store from './store/'
import components from './components/' //加载公共组件
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import './css/common.css'
import './less/common.less'
 
Object.keys(components).forEach((key) => {
    var name = key.replace(/(\w)/, (v) => v.toUpperCase()) //首字母大写
    Vue.component(`v${name}`, components[key])
})

Vue.use(VueRouter)
Vue.use(VueMaterial)


const router = new VueRouter({
    routes
})
router.beforeEach(({meta, path}, from, next) => {
    var { auth = true } = meta
    var isLogin = Boolean(store.state.user.id) //true用户已登录， false用户未登录

    if (auth && !isLogin && path !== '/login') {
        return next({ path: '/login' })
    }
    next()
})

new Vue({ store, router }).$mount('#app')