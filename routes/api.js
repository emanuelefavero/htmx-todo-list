import { Router } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { todos } from '../data/todos.js'

const apiRouter = Router()

// Calculate directory path
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// API routes
// * GET /api/todos
apiRouter.get('/api/todos', (req, res) => {
  const todosHTML = todos
    .map((todo) => {
      return `<li class="${todo.completed && 'line-through'}">${todo.text}</li>`
    })
    .join('')

  res.send(todosHTML)
})

export default apiRouter
