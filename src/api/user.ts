import type { UserListResponse } from '@/types'

// Mock User API
export const userApi = {
  getUsers: async (_params?: any): Promise<UserListResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      list: [
        {
          id: 1,
          username: 'admin',
          fullName: 'admin',
          email: 'admin@example.com',
          role: 'Director',
          subRole: 'Admin',
          status: 'Active',
          socials: ['fb', 'ig', 'tw'],
          expiration: ''
        },
        {
          id: 2,
          username: 'admin1',
          fullName: 'admin 1',
          email: 'admin1@example.com',
          role: 'Social Staff',
          subRole: 'Manager',
          status: 'Active',
          socials: ['fb'],
          expiration: ''
        },
        {
          id: 3,
          username: 'admin2',
          fullName: 'admin 2',
          email: 'admin2@example.com',
          role: 'Director',
          subRole: 'Admin',
          status: 'Active',
          socials: ['fb', 'ig', 'gh'],
          expiration: ''
        },
        {
          id: 4,
          username: 'admin5',
          fullName: 'admin 5',
          email: 'admin5@example.com',
          role: 'Director',
          subRole: 'Admin',
          status: 'Active',
          socials: ['ig', 'tw', 'fb'],
          expiration: ''
        },
        {
          id: 5,
          username: 'dtsmart',
          fullName: 'Dtsmart Team',
          email: 'dtsmart_team@fastboy.net',
          role: 'AE Staff',
          subRole: 'User',
          status: 'Active',
          socials: ['fb', 'ig'],
          expiration: ''
        }
      ],
      total: 26
    }
  }
}

