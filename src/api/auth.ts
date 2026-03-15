import { CONSTANTS } from '@/constants'
import type { LoginResponse } from '@/types'

/**
 * Authentication API/Service layer
 * Decouples persistence/network from the state management.
 */
export const authApi = {
  saveToken(token: string): void {
    localStorage.setItem(CONSTANTS.STORAGE_KEYS.TOKEN, token)
  },

  getToken(): string | null {
    return localStorage.getItem(CONSTANTS.STORAGE_KEYS.TOKEN)
  },

  removeToken(): void {
    localStorage.removeItem(CONSTANTS.STORAGE_KEYS.TOKEN)
  },

  login(username: string, password: string): LoginResponse {
    if (username === 'admin' && password === '123456') {
      return { success: true, token: 'fake-token-' + Date.now() }
    }
    return { success: false, message: 'Invalid credentials' }
  }
}

