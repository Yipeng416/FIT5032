<template>
  <div class="comment-section">
    <textarea v-model="commentText" placeholder="Write your comment here..."></textarea>
    <button class="btn btn-primary mt-2" @click="submitComment">Submit</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const commentText = ref('')

const submitComment = () => {
  emit('submit-comment', commentText.value)
  commentText.value = '' // clear the textarea
}
</script>

<style scoped>
textarea {
  width: 100%;
  height: 100px;
  resize: none;
  padding: 10px;
}
</style>
