<template>
  <div class="user-card__wrapper">
    <img :src="avatar" alt="user avatar" @click="handleImageClicked" class="user-image" />
    <div class="user-card__informaton">
      <Transition name="fade">
        <p v-if="clicked" class="user-card__country">
          <span class="item">Country</span>: {{ country }}
        </p>
      </Transition>
      <p class="user-card__title"><span class="item">Title</span>: {{ title }}</p>
      <p class="user-card__score"><span class="item">Score</span>: {{ score }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  title: String,
  subtitle: String,
  score: Number,
  country: String,
  avatar: String
})

const clicked = ref(false)

const handleImageClicked = (event: MouseEvent) => {
  event?.stopPropagation()

  clicked.value = !clicked.value
}
</script>

<style lang="css" scoped>
.user-card__wrapper {
  width: 350px;
  height: 250px;
  background: white;
  margin: 50px;
  border-radius: 20px;
  padding: 20px;
}

.user-card__wrapper p {
  color: black;
  font-size: 15px;
}

.user-card__informaton {
  margin-top: 20px;
}

.user-card__country {
  transition: 1s ease-in-out;
}

.item {
  font-weight: bold;
}

.user-image {
  width: 100px;
  border-radius: 50%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
