import { mockFetch } from './mockFetch'

export function getUsers() {
  return mockFetch('/api/users')
}
