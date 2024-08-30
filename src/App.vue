<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BHeader from './components/BHeader.vue'

const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true')
const router = useRouter()

const logout = () => {
  localStorage.removeItem('isAuthenticated')
  isAuthenticated.value = false
  router.push('/login')
}
</script>

<template>
  <header>
    <BHeader />
  </header>

  <nav>
    <router-link to="/">Home</router-link>
    <router-link v-if="isAuthenticated" to="/about">About</router-link>
    <router-link v-else to="/login">Login</router-link>
    <button v-if="isAuthenticated" @click="logout">Logout</button>
  </nav>

  <main>
    <router-view />
  </main>
</template>
