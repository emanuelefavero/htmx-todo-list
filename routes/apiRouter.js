import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { fileURLToPath } from 'url'
import { todos } from '../data/todos.js'
import generateTodosHTML from '../utilities/generateTodosHTML.js'

const apiRouter = Router()

// Calculate directory path
const __dirname = path.dirname(fileURLToPath(import.meta.url))

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

// * POST /api/todos/toggle/:id - toggle the completion status of a todo
apiRouter.post('/api/todos/toggle/:id', (req, res) => {
  const { id } = req.params
  const todo = todos.find((t) => t.id === id)
  if (todo) {
    todo.completed = !todo.completed

    // Put todo at the top if it's toggled to not completed
    if (!todo.completed) {
      const index = todos.findIndex((t) => t.id === id)
      todos.splice(index, 1)
      todos.unshift(todo)
    }
  }

  res.send(generateTodosHTML(todos))
})

// * POST /api/delete/:id - delete a todo
apiRouter.post('/api/todos/delete/:id', (req, res) => {
  const { id } = req.params
  const index = todos.findIndex((t) => t.id === id)
  if (index !== -1) todos.splice(index, 1)

  res.send(generateTodosHTML(todos))
})

// * POST /api/delete-completed - delete all completed todos
apiRouter.post('/api/todos/delete-completed', (req, res) => {
  for (let i = todos.length - 1; i >= 0; i--) {
    if (todos[i].completed) {
      todos.splice(i, 1)
    }
  }

  res.send(generateTodosHTML(todos))
})

export default apiRouter
