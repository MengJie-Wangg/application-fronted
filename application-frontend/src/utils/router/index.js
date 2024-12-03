import { createRouter, createWebHistory } from 'vue-router'
/* Layout */
import Layout from '@/layout/index.vue'

export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/index.vue'),
        name: 'Index',
        meta: {
          title: '首页',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})
const routerPush = router.push
router.push = function (location) {
  return routerPush.call(this, location).catch(err => err)
}
export default router
