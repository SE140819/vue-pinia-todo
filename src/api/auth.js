import { CONSTANTS } from '@/constants'

/**
 * Authentication API/Service layer
 * Decouples persistence/network from the state management.
 */
export const authApi = {
  saveToken(token) {
    localStorage.setItem(CONSTANTS.STORAGE_KEYS.TOKEN, token)
  },

  getToken() {
    return localStorage.getItem(CONSTANTS.STORAGE_KEYS.TOKEN)
  },

  removeToken() {
    localStorage.removeItem(CONSTANTS.STORAGE_KEYS.TOKEN)
  },

  login(username, password) {
    // Mock login logic - in a real app, this would use axiosClient
    if (username === 'admin' && password === '123456') {
      return { success: true, token: 'fake-token-' + Date.now() }
    }
    return { success: false, message: 'Invalid credentials' }
  }
}
