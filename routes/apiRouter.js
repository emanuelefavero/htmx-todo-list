import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { todos } from '../data/todos.js'
import pool from '../config/database.js'
import generateTodosHTML from '../utilities/generateTodosHTML.js'

const apiRouter = Router()

// * GET /api/todos - get all todos
apiRouter.get('/api/todos', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM todos')
    res.send(generateTodosHTML(rows)) // ? rows is the array of todos
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send('An error occurred while fetching todos from the database')
  }
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
