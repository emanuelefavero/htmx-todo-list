import request from 'supertest'
import express from 'express'
import pagesRouter from './pagesRouter.js'

const app = express()
app.use(pagesRouter)

describe('GET /', () => {
  it('should respond with status 200', async () => {
    await request(app).get('/').expect(200)
  })

  it('should respond with the index.html file', async () => {
    const response = await request(app).get('/')
    expect(response.text).toContain('<!DOCTYPE html>')
  })
})
