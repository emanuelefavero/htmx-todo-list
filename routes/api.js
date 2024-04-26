import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { fileURLToPath } from 'url'
import { todos } from '../data/todos.js'

const apiRouter = Router()

// Calculate directory path
const __dirname = path.dirname(fileURLToPath(import.meta.url))

function generateTodosHTML(todos) {
  // Put completed todos at the bottom
  todos.sort((a, b) => a.completed - b.completed)

  return todos
    .map((todo) => {
      return `<li hx-post="/api/toggle/${
        todo.id
      }" hx-trigger="click" hx-target="#todos" class="todo-item ${
        todo.completed ? 'line-through text-gray-400 dark:text-gray-600' : ''
      }">${todo.text} ${
        todo.completed
          ? `<button hx-post="/api/delete/${todo.id}" hx-trigger="click" hx-target="#todos" class='delete-button'>X</button>`
          : ''
      }
      </li>`
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
  const newTodo = { id: uuidv4(), text, completed: false }
  todos.unshift(newTodo) // add new todo at the beginning

  res.send(generateTodosHTML(todos))
})

// * POST /api/toggle/:id - toggle the completion status of a todo
apiRouter.post('/api/toggle/:id', (req, res) => {
  const { id } = req.params
  const todo = todos.find((t) => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }

  res.send(generateTodosHTML(todos))
})

// * POST /api/delete/:id - delete a todo
apiRouter.post('/api/delete/:id', (req, res) => {
  const { id } = req.params
  const index = todos.findIndex((t) => t.id === id)
  if (index !== -1) todos.splice(index, 1)

  res.send(generateTodosHTML(todos))
})

export default apiRouter
