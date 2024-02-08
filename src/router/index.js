import { createRouter, createWebHistory } from 'vue-router'
import BoltVue from '../views/Bolt.vue'
import UjtermekVue from '@/components/Ujtermek.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'bolt',
      component: BoltVue
    },
    {
      path: '/kosar',
      name: 'kosar',
      component: () => import('../views/Kosar.vue')
    },
    {
      path: '/ujtermek',
      name: 'ujtermek',
      component: UjtermekVue
    }
  ]
})

export default router
