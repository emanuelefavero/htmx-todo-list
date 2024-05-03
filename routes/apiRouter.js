import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import pool from '../config/database.js'
import generateTodosHTML from '../utilities/generateTodosHTML.js'

const apiRouter = Router()

// * GET /api/todos - get all todos
apiRouter.get('/api/todos', async (req, res) => {
  try {
    // * Fetch all todos from the PostgreSQL database with `pg` pool
    const { rows } = await pool.query('SELECT * FROM todos')

    // Send todos as HTML
    res.send(generateTodosHTML(rows)) // ? rows is the array of todos

    // Error handling
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send('An error occurred while fetching todos from the database')
  }
})

// * POST /api/todos - add a new todo
apiRouter.post('/api/todos', async (req, res) => {
  // * Insert a new todo into the PostgreSQL database with `pg` pool
  try {
    const { text } = req.body
    await pool.query(
      'INSERT INTO todos (id, text, completed) VALUES ($1, $2, $3)',
      [uuidv4(), text, false]
    )

    // Fetch all todos from the database
    const { rows } = await pool.query('SELECT * FROM todos')

    // Send todos as HTML
    res.send(generateTodosHTML(rows))

    // Error handling
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send('An error occurred while adding a new todo to the database')
  }
})

// * PATCH /api/todos/toggle/:id - toggle the completion status of a todo
apiRouter.patch('/api/todos/toggle/:id', async (req, res) => {
  const { id } = req.params

  try {
    // Toggle the completion status of the todo
    const toggleResponse = await pool.query(
      `UPDATE todos 
      SET completed = NOT completed 
      WHERE id = $1 
      RETURNING *;`,
      [id]
    )
    if (toggleResponse.rows.length === 0) {
      return res
        .status(404)
        .send('<p>Todo not found when toggling completed state</p>')
    }

    // Put not completed todos at the top of the list and send as HTML
    const { rows } = await pool.query(
      `SELECT * FROM todos 
      ORDER BY completed ASC, (id = $1) DESC;`,
      [id]
    )
    res.send(generateTodosHTML(rows))

    // Error handling
  } catch (error) {
    console.error('Error toggling todo completion', error)
    res.status(500).send('<p>Internal server error</p>')
  }
})

// * DELETE /api/delete/:id - delete a todo
apiRouter.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params

  try {
    const deleteResponse = await pool.query(
      'DELETE FROM todos WHERE id = $1 RETURNING *;',
      [id]
    )
    if (deleteResponse.rows.length === 0) {
      return res.status(404).send('<p>Todo not found when deleting</p>')
    }

    // Fetch all todos from the database and send as HTML
    const { rows } = await pool.query('SELECT * FROM todos')
    res.send(generateTodosHTML(rows))

    // Error handling
  } catch (error) {
    console.error('Error deleting todo', error)
    res.status(500).send('<p>Internal server error</p>')
  }
})

// * DELETE /api/delete-completed - delete all completed todos
apiRouter.post('/api/todos/delete-completed', async (req, res) => {
  try {
    await pool.query('DELETE FROM todos WHERE completed = true;')

    // Fetch all todos from the database and send as HTML
    const { rows } = await pool.query('SELECT * FROM todos')
    res.send(generateTodosHTML(rows))

    // Error handling
  } catch (error) {
    console.error('Error deleting completed todos', error)
    res.status(500).send('<p>Internal server error</p>')
  }
})

export default apiRouter
