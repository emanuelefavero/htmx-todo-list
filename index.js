import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import pagesRouter from './routes/pages.js'
import apiRouter from './routes/api.js'

const app = express()
const PORT = 3000

// Serve static files from public directory
app.use(express.static('public'))

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }))

// Middleware to parse JSON bodies
app.use(express.json())

// Use routes
app.use('/', pagesRouter) // Use pages routes
app.use('/api', apiRouter) // Use API routes under the /api prefix

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
