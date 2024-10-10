<template>
  <div class="container mt-5">
    <h2>Profile</h2>
    <p>Email: {{ currentUser.email }}</p>
    <p>Role: {{ currentUser.role }}</p>
    <button class="btn btn-danger" @click="logout">Sign Out</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentUser = ref({ email: '', role: '' })

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  if (user) {
    currentUser.value = user
  } else {
    router.push('/auth/login')
  }
})

const logout = () => {
  localStorage.removeItem('currentUser')
  router.push('/')
}
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: auto;
}
</style>
