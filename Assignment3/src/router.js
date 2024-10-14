import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/components/HomeView.vue'
import AboutUs from './components/Web/AboutUs.vue'
import ContactUs from './components/Web/ContactUs.vue'
import Login from './components/Authentic/Login.vue'
import SignUp from './components/Authentic/SignUp.vue'
import UserList from './components/UserList.vue'
import Profile from './components/Profile.vue'
import FeedbackView from './components/FeedbackView.vue'
import DataTableView from './components/DataTableView.vue'
import MapView from './components/MapView.vue'

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
    path: '/Web/ContactUs',
    name: 'Contact_us',
    component: ContactUs
  },
  {
    path: '/auth/login',
    name: 'login',
    component: Login
  },
  {
    path: '/auth/signup',
    name: 'signup',
    component: SignUp
  },
  { path: '/users', name: 'users', component: UserList },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/feedback', name: 'feedback', component: FeedbackView },
  { path: '/datatable', name: 'datatable', component: DataTableView},
  { path: '/map', name: 'map', component: MapView },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
