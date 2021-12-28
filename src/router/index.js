import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from 'layout'

export const constantRouter = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Layout,
    children: [{
      path: '/home',
      name: 'home', // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
      component: () => import('views')
    }]
  },
  {
    path: '/about',
    component: Layout,
    children: [{
      path: '/about',
      name: 'about',
      component: () => import('views/about')
    }]
  },
  {
    path: '/list',
    name: 'list',
    component: Layout,
    children: [{
      path: '/list',
      name: 'list',
      component: () => import('views/list')
    }]
  }
]

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    // savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用
    return savedPosition || { y: 0 }
  }, // 切换组件，页面回到顶部
  routes: constantRouter
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router

// export default new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes: [{
//       path: '/',
//       redirect: '/home'
//     },
//     {
//       path: '/home',
//       name: 'home',
//       component: Layout,
//       children: [{
//         path: '/home',
//         name: 'home',
//         component: () => import('views')
//       }]
//     },
//     {
//       path: '/about',
//       name: 'about',
//       component: Layout,
//       children: [{
//         path: '/about',
//         name: 'about',
//         component: () => import('views/About')
//       }]
//     }
//   ]
// })