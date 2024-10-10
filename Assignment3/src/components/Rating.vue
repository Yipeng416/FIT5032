<template>
  <div class="rating-buttons">
    <button
      v-for="score in 6"
      :key="score"
      @click="setRating(score - 1)"
      :class="{ selected: score - 1 === currentRating }"
    >
      {{ score - 1 }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentRating = ref(0)

const setRating = (rating) => {
  currentRating.value = rating
  emit('update:rating', currentRating.value)
}
</script>

<style scoped>
.rating-buttons {
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.selected {
  background-color: gold;
  color: white;
}
</style>
