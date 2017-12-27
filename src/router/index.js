import Vue from 'vue'
import Router from 'vue-router'
import iview from 'iview'

Vue.use(iview)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/components/index'], resolve)
    },
    {
      path: '/option2',
      name: 'option2',
      component: resolve => require(['@/components/option2'], resolve)
    }
  ]
})
