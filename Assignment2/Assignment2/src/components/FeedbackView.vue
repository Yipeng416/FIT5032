<template>
  <div class="feedback-page">
    <h1>All Comments</h1>
    <ul>
      <li v-for="comment in comments" :key="comment.text">
        <strong>{{ comment.user }}:</strong> {{ comment.text }} <br />
        Rating: {{ comment.rating }} / 5
      </li>
    </ul>

    <h2 v-if="averageRating !== null">Average Rating: {{ averageRating }} / 5</h2>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const comments = ref([])

onMounted(() => {
  comments.value = JSON.parse(localStorage.getItem('comments')) || []
})

const averageRating = computed(() => {
  if (comments.value.length === 0) return null
  const sum = comments.value.reduce((total, comment) => total + comment.rating, 0)
  return (sum / comments.value.length).toFixed(1)
})
</script>

<style scoped></style>
