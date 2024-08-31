<template>
  <div class="container mt-5">
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSubmit">
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
        <div v-if="emailError" class="text-danger">{{ emailError }}</div>
      </div>
      <div class="form-floating mb-3">
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          v-model="password"
          required
          minlength="6"
        />
        <label for="password">Password</label>
        <div v-if="passwordError" class="text-danger">{{ passwordError }}</div>
      </div>
      <button class="btn btn-primary" type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')

const handleSubmit = () => {
  emailError.value = ''
  passwordError.value = ''

  if (!validateEmail(email.value)) {
    emailError.value = 'Invalid email format'
    return
  }

  if (password.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters'
    return
  }

  // 如果验证通过，执行提交逻辑
  alert('Sign up successful!')
}

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/
  return re.test(email)
}
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: auto;
}
</style>
