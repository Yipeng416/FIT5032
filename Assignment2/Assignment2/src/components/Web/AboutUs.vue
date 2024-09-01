<template>
  <div class="about-us">
    <h1>About Our Organization</h1>
    <p>We are dedicated to improving the lives of migrant communities...</p>

    <!-- after logining in show rating -->
    <div v-if="isLoggedIn" class="rating-comment-section">
      <h2>Leave a Rating</h2>
      <div class="rating-buttons">
        <button
          v-for="score in 6"
          :key="score"
          @click="handleRating(score - 1)"
          :class="{ selected: score - 1 === currentRating }"
        >
          {{ score - 1 }}
        </button>
      </div>

      <h2>Leave a Comment</h2>
      <textarea v-model="newComment" placeholder="Write your comment here..."></textarea>
      <button class="submit-button" @click="submitComment">Submit</button>
    </div>

    <!-- show comments and rating -->
    <h2>All Comments</h2>
    <ul>
      <li v-for="comment in comments" :key="comment.text">
        <strong>{{ comment.user }}:</strong> {{ comment.text }} <br />
        Rating: {{ comment.rating }} / 5
      </li>
    </ul>

    <!-- show average -->
    <h3 v-if="averageRating !== null">Average Rating: {{ averageRating }} / 5</h3>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const comments = ref([]) // renew comments
const newComment = ref('')
const currentRating = ref(0)

const isLoggedIn = computed(() => {
  const user = localStorage.getItem('currentUser')
  return user !== null
})

const handleRating = (newRating) => {
  currentRating.value = newRating
}

const submitComment = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  if (user && newComment.value.trim()) {
    comments.value.push({
      user: user.email,
      text: newComment.value,
      rating: currentRating.value
    })
    newComment.value = ''
    currentRating.value = 0 // submit and renew rating
  }
}

const averageRating = computed(() => {
  if (comments.value.length === 0) return null
  const total = comments.value.reduce((sum, comment) => sum + comment.rating, 0)
  return (total / comments.value.length).toFixed(1)
})

// load former comments
onMounted(() => {
  const storedComments = JSON.parse(localStorage.getItem('comments'))
  if (storedComments) {
    comments.value = storedComments
  }
})

// get comments and put in localStorage
watch(
  comments,
  (newComments) => {
    localStorage.setItem('comments', JSON.stringify(newComments))
  },
  { deep: true }
)
</script>

<style scoped>
.about-us {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.rating-comment-section {
  margin-bottom: 2rem;
}

.rating-buttons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: white;
}

button:hover {
  background-color: #f0f0f0;
}

.selected {
  background-color: gold;
  color: white;
}

textarea {
  width: 100%;
  margin-bottom: 1rem;
}

.submit-button {
  margin: 0 auto;
  display: block;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
