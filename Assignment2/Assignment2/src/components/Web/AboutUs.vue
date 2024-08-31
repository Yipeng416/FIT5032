<template>
  <div class="about-us">
    <h1>About Our Organization</h1>
    <p>We are dedicated to improving the lives of migrant communities...</p>

    <div v-if="isLoggedIn">
      <h2>Leave a Rating</h2>
      <Rating @update:rating="handleRating" />

      <h2>Leave a Comment</h2>
      <Comment @submit-comment="handleComment" />

      <h2>All Comments</h2>
      <ul>
        <li v-for="(comment, index) in comments" :key="index">
          <strong>{{ comment.user }}:</strong> {{ comment.text }}
          <div>Rating: {{ comment.rating }} / 5</div>
        </li>
      </ul>
    </div>

    <div v-else>
      <p>Please log in to leave a comment and rating.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Rating from '@/components/Rating.vue'
import Comment from '@/components/Comment.vue'

// Dummy data for comments
const comments = ref([
  { user: 'user1@example.com', text: 'Great organization!', rating: 5 },
  { user: 'user2@example.com', text: 'Doing fantastic work.', rating: 4 }
])

const isLoggedIn = computed(() => {
  const user = localStorage.getItem('currentUser')
  return user !== null
})

const handleRating = (newRating) => {
  // Store the rating temporarily
  currentRating.value = newRating
}

const handleComment = (newComment) => {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  if (user) {
    comments.value.push({
      user: user.email,
      text: newComment,
      rating: currentRating.value
    })
    currentRating.value = 0 // reset rating after submission
  }
}

const currentRating = ref(0)
</script>

<style scoped>
.about-us {
  padding: 20px;
}
</style>
