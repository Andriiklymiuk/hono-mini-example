import { User } from '../types/user'
import { dataStore } from '../data/store'

export class UserService {
  static getCurrentUser(token: string): { user: User | null; error: string | null } {
    const session = dataStore.sessions.get(token)
    
    if (!session || session.expiresAt < new Date()) {
      return { user: null, error: 'Unauthorized access - please log in again.' }
    }

    const user = dataStore.users.find(u => u.id === session.userId)
    if (!user) {
      return { user: null, error: 'User not found' }
    }

    return { user, error: null }
  }
}