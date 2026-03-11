export const CONSTANTS = {
  STORAGE_KEYS: {
    TOKEN: 'token',
    TODOS: 'todos'
  },
  API: {
    BASE_URL: (import.meta.env.VITE_API_URL as string) || '/api'
  }
} as const

