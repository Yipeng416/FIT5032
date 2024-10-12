<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="loginUser">
      <input v-model="email" type="email" placeholder="email" required />
      <input v-model="password" type="password" placeholder="password" required />
      <button type="submit">Login</button>
    </form>
    <p>{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { auth } from '@/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const email = ref('')
const password = ref('')
const error = ref('')

const loginUser = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    error.value = 'Login successfully!'
    // 登录成功后跳转到主页或个人页面
  } catch (err) {
    error.value = 'False:' + err.message
  }
}
</script>

<style scoped>
.login {
  text-align: center;
}
</style>
