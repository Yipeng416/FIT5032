<template>
  <div class="container mt-5">
    <h2>Registered Users</h2>
    <ul class="list-group">
      <li v-for="user in users" :key="user.email" class="list-group-item">
        {{ user.email }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])

onMounted(() => {
  // get userlist from localstorage
  const storedUsers = JSON.parse(localStorage.getItem('users')) || []
  users.value = storedUsers
})
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: auto;
}
</style>
