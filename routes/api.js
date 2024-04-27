import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { fileURLToPath } from 'url'
import { todos } from '../data/todos.js'

const apiRouter = Router()

// Calculate directory path
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// * Generate HTML for todos
function generateTodosHTML(todos) {
  const notCompletedTodos = []
  const completedTodos = []

  todos.forEach((todo) => {
    if (todo.completed) {
      completedTodos.push(todo)
    } else {
      notCompletedTodos.push(todo)
    }
  })

  // Generate HTML for not completed todos
  const notCompletedHTML = notCompletedTodos
    .map((todo) => {
      return `<li hx-post="/api/toggle/${todo.id}" hx-trigger="click" hx-target="#todos" class="todo-item">${todo.text}</li>`
    })
    .join('')

  // HTML content to put between not completed and completed todos
  const separatorHTML = `<div>--- <button hx-post="/api/delete-completed" hx-trigger="click" hx-target="#todos" class="delete-button separator">Delete Completed</button> ---</div>`

  // Generate HTML for completed todos
  const completedHTML = completedTodos
    .map((todo) => {
      return `<li hx-post="/api/toggle/${todo.id}" hx-trigger="click" hx-target="#todos" class="todo-item completed">${todo.text} <button hx-post="/api/delete/${todo.id}" hx-trigger="click" hx-target="#todos" class='delete-button'>X</button></li>`
    })
    .join('')

  // Combine and return the full HTML (if there are no completed todos, don't include the separator)
  return (
    notCompletedHTML +
    (completedTodos.length ? separatorHTML + completedHTML : '')
  )
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
apiRouter.post('/api/delete/:id', (req, res) => {
  const { id } = req.params
  const index = todos.findIndex((t) => t.id === id)
  if (index !== -1) todos.splice(index, 1)

  res.send(generateTodosHTML(todos))
})

// * POST /api/delete-completed - delete all completed todos
apiRouter.post('/api/delete-completed', (req, res) => {
  for (let i = todos.length - 1; i >= 0; i--) {
    if (todos[i].completed) {
      todos.splice(i, 1)
    }
  }

  res.send(generateTodosHTML(todos))
})

export default apiRouter
