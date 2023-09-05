import { reactive } from 'vue'
import { defineStore } from 'pinia'
// mock fetch request
import { getUsers } from '../api/api'

export type IUser = Record<'avatar' | 'title' | 'subtitle' | 'country', string> & { score: number }

// Composition API in Pinia with reactive state
export const useFetchUsers = defineStore('fetchUsers', () => {
  const state = reactive<{
    users: IUser[]
    isLoading: boolean
    error: unknown | keyof typeof Response
  }>({
    users: [],
    error: '',
    isLoading: false
  })

  const fetchUsers = async () => {
    try {
      state.isLoading = true
      const response = await getUsers()

      if (Array.isArray(response) && !!response?.length) {
        state.users.push(response as unknown as IUser)
      } else {
        state.error = 'Response error!'
      }
    } catch (error) {
      state.error = error

      alert('Server error!')
    } finally {
      state.isLoading = false
    }
  }

  return { state, fetchUsers }
})
