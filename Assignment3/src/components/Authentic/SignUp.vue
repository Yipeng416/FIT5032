<template>
  <div class="register">
    <h2>Firebase register</h2>
    <form @submit.prevent="register">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required @blur="validateEmail" />
        <p v-if="emailError" class="error">{{ emailError }}</p>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required @blur="validatePassword" />
        <p v-if="passwordError" class="error">{{ passwordError }}</p>
      </div>
      <button type="submit" :disabled="isFormInvalid">Register</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const emailError = ref('')
const passwordError = ref('')
const isFormInvalid = ref(true)
const router = useRouter()

// 简单的邮箱格式验证
const validateEmail = () => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  if (!emailPattern.test(email.value)) {
    emailError.value = 'Please enter a valid email address'
  } else {
    emailError.value = ''
  }
  validateForm()
}

// 简单的密码验证：长度至少为 6
const validatePassword = () => {
  if (password.value.length < 6) {
    passwordError.value = 'The password length must be at least 6 characters'
  } else {
    passwordError.value = ''
  }
  validateForm()
}

// 确保表单验证通过后再提交
const validateForm = () => {
  isFormInvalid.value = emailError.value || passwordError.value || !email.value || !password.value
}

const register = () => {
  if (!emailError.value && !passwordError.value) {
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        console.log('Firebase register successfully')
        router.push('/Home') // 注册成功后跳转到 Home 页面
      })
      .catch((err) => {
        error.value = 'register fail: ' + err.message
      })
  }
}
</script>

<style scoped>
.error {
  color: red;
  font-size: 0.875rem;
}
</style>
