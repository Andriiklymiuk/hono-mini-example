import { User } from '../types/user'

export const dataStore = {
  users: [
    {
      id: '1',
      email: 'user@example.com',
      name: 'John Doe',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ] as User[],
  sessions: new Map<string, { userId: string; expiresAt: Date }>()
}