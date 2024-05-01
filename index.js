import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import apiRouter from './routes/apiRouter.js'
import pagesRouter from './routes/pagesRouter.js'

const app = express()
const PORT = 3000

// Serve static files from public directory
app.use(express.static('public'))

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }))

// Middleware to parse JSON bodies
app.use(express.json())

// Use routes
app.use(apiRouter) // Use API routes under the /api prefix
app.use(pagesRouter) // Use pages routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
