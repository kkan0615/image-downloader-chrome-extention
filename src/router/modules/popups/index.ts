import { RouteRecordRaw } from 'vue-router'

export const popupRoutes: RouteRecordRaw[] = [
  {
    path: '/popup',
    name: 'PopupLayout',
    component: () => import('@/views/popups/index.vue'),
    redirect: { name: 'PopupMain' },
    children: [
      {
        path: 'main',
        name: 'PopupMain',
        component: () => import('@/views/popups/Main/index.vue'),
      },
      {
        path: 'setting',
        name: 'PopupSetting',
        component: () => import('@/views/popups/Setting/index.vue'),
      },
    ]
  },
]
