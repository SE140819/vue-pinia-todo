import { defineStore } from "pinia"
import { authApi } from "@/api/auth"

interface AuthState {
  token: string | null
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: authApi.getToken()
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {
    login(username: string, password: string): boolean {
      const response = authApi.login(username, password)
      
      if (response.success && response.token) {
        this.token = response.token
        authApi.saveToken(this.token)
        return true
      }
      
      return false
    },

    logout(): void {
      this.token = null
      authApi.removeToken()
    }
  }
})