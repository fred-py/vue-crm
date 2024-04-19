import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import AppLayout from '@/layout/AppLayout.vue'  // This is from PrimeVue Sakai template
import ManageCustomers from '@/views/ManageCustomers.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path:'/',
          component: Dashboard,
        },
        {
          path: '/manage/customers',
          component: ManageCustomers,
        },

      ]
    },
  ]
})

export default router
