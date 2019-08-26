<<<<<<< HEAD
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
=======
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$http = Axios // set an alias

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
>>>>>>> dd51dfdd598d0f9566b6aac9dd4aba30924dd5b3
