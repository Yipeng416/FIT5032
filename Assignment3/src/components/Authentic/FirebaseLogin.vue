<template>
  <div class="container mt-5">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-floating mb-3">
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="name@example.com"
          v-model="email"
          required
        />
        <label for="email">Email address</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          v-model="password"
          required
        />
        <label for="password">Password</label>
      </div>
      <button class="btn btn-primary" type="submit">Login</button>
      <div v-if="loginError" class="text-danger mt-3">{{ loginError }}</div>
    </form>
    <hr />
    <div class="admin-login">
      <h4>Admin Login</h4>
      <p>Use the credentials: email: 123456@gmail.com, password: 123456</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const loginError = ref('')
const router = useRouter()

// hard code
const adminEmail = '123456@gmail.com'
const adminPassword = '123456'

const handleLogin = () => {
  loginError.value = ''

  // check if admin
  if (email.value === adminEmail && password.value === adminPassword) {
    // admin login, go to  UserList
    localStorage.setItem('currentUser', JSON.stringify({ email: adminEmail, role: 'admin' }))
    router.push('/users')
  } else {
    // common users
    const users = JSON.parse(localStorage.getItem('users')) || []

    const user = users.find(
      (user) => user.email === email.value && user.password === password.value
    )

    if (user) {
      // common users to home page
      localStorage.setItem('currentUser', JSON.stringify({ email: user.email, role: 'user' }))
      router.push('/')
    } else {
      loginError.value = 'Invalid credentials'
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: auto;
}
</style>
