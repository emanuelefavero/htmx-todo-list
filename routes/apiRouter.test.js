import request from 'supertest'
import express from 'express'
import apiRouter from './apiRouter.js'

const app = express()
app.use(apiRouter)

// TIP: Since we are using HTMX to update the UI, the routes will return partial HTML. We test the HTML content in generateHTML.test.js

describe('GET /api/todos', () => {
  it('should respond with status 200', async () => {
    await request(app).get('/api/todos').expect(200)
  })
})

describe('POST /api/todos', () => {
  it('should respond with status 500', async () => {
    await request(app).post('/api/todos').expect(500)
  })
})

describe('POST /api/todos/toggle/:id', () => {
  it('should respond with status 200', async () => {
    await request(app).post('/api/todos/toggle/1').expect(200)
  })
})

describe('POST /api/todos/delete/:id', () => {
  it('should respond with status 200', async () => {
    await request(app).post('/api/todos/delete/1').expect(200)
  })
})
