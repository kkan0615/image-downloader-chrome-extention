import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { popupRoutes } from '@/router/modules/popups'

export const routes: RouteRecordRaw[] = [
  // Index.html
  {
    path: '/index.html',
    component: () => import('@/views/index.vue'),
    redirect: { name: 'PopupLayout' },
  },
  {
    path: '/',
    name: 'AppIndex',
    component: () => import('@/views/index.vue'),
    redirect: { name: 'PopupLayout' },
    children: [
      ...popupRoutes,
    ]
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'Error404',
  //   component: () => import('@/views/errors/404/index.vue'),
  // },
]


export const router = createRouter({
  history: createWebHistory(''),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) {
      return { el: to.hash }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
