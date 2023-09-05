<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
// async actions
import { IUser, useFetchUsers } from '../store/index'
// ui components
import userCard from '../ui/user-card.vue'
import loader from '../ui/loader.vue'
// constants
import { scoreOptions } from '../constants'
// helpers functions
import { scoreChecked } from '../helpers/index'

// component logic
const { state, fetchUsers } = useFetchUsers()

const selectedCountry = ref('Default')

const selectedScore = ref('Default')

onMounted(() => fetchUsers())

const countryOptions = computed(
  () =>
    Array.isArray(state.users[0]) &&
    state.users[0].map((item: IUser) => {
      return item.country
    })
)

const filteredUsersByOption = computed(() => {
  if (selectedCountry.value === 'Default') {
    return state.users[0]
  } else {
    return (
      Array.isArray(state.users[0]) &&
      state.users[0].reduce((acc, item) => {
        scoreChecked(item.score, selectedScore.value) &&
          item.country === selectedCountry.value &&
          acc.push(item)
        return acc
      }, [])
    )
  }
})
</script>

<template>
  <div class="page-wrapper">
    <div>
      <div class="select-wrapper">
        <label for="country">Country:</label>
        <select name="country" id="country" v-model="selectedCountry" class="select">
          <option disabled>Select from list</option>
          <option value="Default">Default</option>
          <option v-for="(item, index) in countryOptions" :key="index">
            {{ item }}
          </option>
        </select>
      </div>

      <div class="select-wrapper">
        <label for="score">Score:</label>
        <select name="score" id="score" v-model="selectedScore" class="select">
          <option disabled>Select from list</option>
          <option v-for="(item, index) in scoreOptions" :key="index">
            {{ item }}
          </option>
        </select>
      </div>

      <Transition name="fade">
        <div class="users-container" v-if="!state.isLoading">
          <ul v-for="(item, index) in filteredUsersByOption" :key="index">
            <user-card
              :title="item.title"
              :subtitle="item.subtitle"
              :avatar="item.avatar"
              :score="item.score"
              :country="item.country"
            ></user-card>
          </ul>
        </div>
        <loader v-else></loader>
      </Transition>
      <h1 v-if="filteredUsersByOption && !filteredUsersByOption.length">No matches with filters</h1>
    </div>
  </div>
</template>

<style scoped lang="css">
.page-wrapper {
  display: flex;
  flex-direction: column;
}

.select-wrapper {
  margin: 20px;
  display: flex;
  flex-direction: column;
}

label {
  margin: 10px;
  float: right;
}

.select {
  padding: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
