import { Hono } from 'hono'
import { LoginRequest } from './types/auth'
import { AuthService } from './services/authService'
import { UserService } from './services/userService'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/user', (c) => {
  const authHeader = c.req.header('Authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ message: ['Unauthorized access - please log in again.'], error: 'Unauthorized', statusCode: 401 }, 401)
  }

  const token = authHeader.substring(7)
  const { user, error } = UserService.getCurrentUser(token)
  
  if (error) {
    const statusCode = error.includes('not found') ? 404 : 401
    return c.json({ message: [error], error: statusCode === 404 ? 'NotFound' : 'Unauthorized', statusCode }, statusCode)
  }

  return c.json(user)
})

app.post('/api/auth/login', async (c) => {
  const body = await c.req.json() as LoginRequest
  
  if (!body.email || !body.password) {
    return c.json({ 
      message: ['Email and password are required'], 
      error: 'ValidationError', 
      statusCode: 400 
    }, 400)
  }

  const loginResult = AuthService.login(body)
  if (!loginResult) {
    return c.json({ 
      message: ['Invalid credentials'], 
      error: 'Unauthorized', 
      statusCode: 401 
    }, 401)
  }

  return c.json(loginResult)
})

export default app
