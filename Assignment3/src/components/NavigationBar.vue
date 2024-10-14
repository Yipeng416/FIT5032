<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Web/about_us">About Us</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Web/contact_us">Contact Us</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/feedback">Feedback</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/datatable">Data Table</router-link> 
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/map">Map</router-link>

          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li v-if="isLoggedIn" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ currentUser.email }}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><router-link class="dropdown-item" to="/profile">Profile</router-link></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#" @click="logout">Sign Out</a></li>
            </ul>
          </li>
          <li v-else class="nav-item">
            <router-link class="btn btn-primary" to="/auth/login">Login</router-link>
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link class="btn btn-primary ms-2" to="/auth/signup">Sign Up</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/firebase'

const router = useRouter()
const isLoggedIn = ref(false)
const currentUser = ref({ email: '', role: '' })

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser.value = { email: user.email }
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
      currentUser.value = { email: '', role: '' }
    }
  })
})

const logout = async () => {
  try {
    await signOut(auth)
    isLoggedIn.value = false
    router.push('/')
  } catch (error) {
    console.error('Sign out error:', error)
  }
}
</script>

<style scoped>
/* 你可以在这里添加样式 */
</style>
