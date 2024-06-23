import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import AppLayout from '@/layout/AppLayout.vue'  // This is from PrimeVue Sakai template
import ManageCustomers from '@/views/ManageCustomers.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
//import LoginPage from '@/views/LoginPage.vue'
//import RegisterPage from '@/views/RegisterPage.vue'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,  // Ensure AppLayout wraps the dashboard routes
      //meta: { 
      //  requiresAuth: true,   // This can be named anything 
      //},
      children: [
        {
          path:'dashboard',  
          name: 'dashboard',
          component: Dashboard,
        },
        {
          path: '/manage/customers',
          name: 'manage-customers',
          component: ManageCustomers,
        },
      ],
    },
  
    {
      path: '',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
  ]
})

export default router
