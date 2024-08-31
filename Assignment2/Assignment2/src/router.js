import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/components/HomeView.vue'
import AboutUs from './components/Web/AboutUs.vue'
import ContactUs from './components/Web/ContactUs.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: HomeView
  },
  {
    path: '/Web/about_us',
    name: 'about_us',
    component: AboutUs
  },
  {
    path: '/Web/Contact_us',
    name: 'Contact_us',
    component: ContactUs
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
