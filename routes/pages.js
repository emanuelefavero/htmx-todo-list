// routes/pages.js
import { Router } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const pagesRouter = Router()

// Calculate directory path
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Routes for serving HTML pages
pagesRouter.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

// pagesRouter.get('/posts', (req, res) => {
//   res.sendFile(path.join(__dirname, '../pages/posts.html'))
// })

export default pagesRouter
