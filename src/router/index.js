import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDeniedView from '../views/AccessDeniedView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { 
    path: '/about', 
    name: 'About', 
    component: AboutView, 
    meta: { requiresAuth: true } // 需要认证的路由
  },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/access-denied', name: 'AccessDenied', component: AccessDeniedView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
