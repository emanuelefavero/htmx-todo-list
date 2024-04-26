import { Router } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { todos } from '../data/todos.js'

const apiRouter = Router()

// Calculate directory path
const __dirname = path.dirname(fileURLToPath(import.meta.url))

function generateTodosHTML(todos) {
  return todos
    .map((todo) => {
      return `<li hx-post="/api/toggle/${
        todo.id
      }" hx-trigger="click" hx-target="#todos" class="${
        todo.completed ? 'line-through' : ''
      }">${todo.text}</li>`
    })
    .join('')
}

// API routes
// * GET /api/todos
apiRouter.get('/api/todos', (req, res) => {
  res.send(generateTodosHTML(todos))
})

// * POST /api/todos - add a new todo
apiRouter.post('/api/todos', (req, res) => {
  const { text } = req.body
  const newTodo = { id: todos.length + 1, text, completed: false }
  todos.push(newTodo)

  res.send(generateTodosHTML(todos))
})

// * POST /api/toggle/:id - toggle the completion status of a todo
apiRouter.post('/api/toggle/:id', (req, res) => {
  const { id } = req.params
  const todo = todos.find((t) => t.id == id)
  if (todo) {
    todo.completed = !todo.completed
  }

  res.send(generateTodosHTML(todos))
})

export default apiRouter
