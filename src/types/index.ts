export interface Todo {
  id: string | number
  text: string
  done: boolean
}

export interface User {
  id: number
  username: string
  fullName: string
  email: string
  role: string
  subRole: string
  status: string
  socials: string[]
  expiration: string
}

export interface UserListResponse {
  list: User[]
  total: number
}

export interface LoginResponse {
  success: boolean
  token?: string
  message?: string
}
