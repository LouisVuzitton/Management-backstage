import Vue from 'vue'
import Router from 'vue-router'
import iview from 'iview'
import VueResource from 'vue-resource'
import Editor from '../../static/wangEditor'

Vue.use(iview)
Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: resolve => require(['@/components/index'], resolve)
    },
    {
      path: '/examineList',
      name: '客户列表',
      component: resolve => require(['@/components/examineList'], resolve)
    },
    {
      path: '/examineInfo/:id',
      name: '客户详情',
      component: resolve => require(['@/components/examineInfo'], resolve)
    },
    {
      path: '/ctemrAudit',
      name: '客户审核',
      component: resolve => require(['@/components/ctemrAudit'], resolve)
    },
    {
      path: '/ctemrLeve',
      name: '客户等级',
      component: resolve => require(['@/components/ctemrLeve'], resolve)
    },
    {
      path: '/xorderList',
      name: '销售订单',
      component: resolve => require(['@/components/xorderList'], resolve)
    },
    {
      path: '/torderList',
      name: '提货订单',
      component: resolve => require(['@/components/torderList'], resolve)
    },
    {
      path: '/xorderInfo/:id',
      name: '销售订单详情',
      component: resolve => require(['@/components/xorderInfo'], resolve)
    },
    {
      path: '/torderInfo/:id',
      name: '提货订单详情',
      component: resolve => require(['@/components/torderInfo'], resolve)
    },
    {
      path: '/shopList',
      name: '商品列表',
      component: resolve => require(['@/components/shopList'], resolve)
    },
    {
      path: '/shopInfo/:type/:id',
      name: '添加/修改商品',
      component: resolve => require(['@/components/shopInfo'], resolve)
    },
    {
      path: '/accSitu',
      name: '财务状况',
      component: resolve => require(['@/components/accSitu'], resolve)
    },
    {
      path: '/witdsCash',
      name: '体现管理',
      component: resolve => require(['@/components/witdsCash'], resolve)
    },
    {
      path: '/rechRecord',
      name: '充值管理',
      component: resolve => require(['@/components/rechRecord'], resolve)
    },
    {
      path: '/bonuRecord',
      name: '奖励记录',
      component: resolve => require(['@/components/bonuRecord'], resolve)
    },
    {
      path: '/notice',
      name: '公告列表',
      component: resolve => require(['@/components/notice'], resolve)
    },
    {
      path: '/noticeInfo/:type/:id',
      name: '添加/修改公告',
      component: resolve => require(['@/components/noticeInfo'], resolve)
    }
  ]
})
