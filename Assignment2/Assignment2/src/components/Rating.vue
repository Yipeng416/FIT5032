<template>
  <div class="rating">
    <span
      v-for="star in 5"
      :key="star"
      @click="setRating(star)"
      :class="{ filled: star <= currentRating }"
    >
      ★
    </span>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const currentRating = ref(0)
const rating = ref(0)

const setRating = (star) => {
  currentRating.value = star
  rating.value = star
}

// Watch the rating to emit it to parent
watch(rating, (newRating) => {
  emit('update:rating', newRating)
})
</script>

<style scoped>
.rating span {
  font-size: 2rem;
  cursor: pointer;
}
.filled {
  color: gold;
}
</style>
