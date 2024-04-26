import { Router } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const apiRouter = Router()

// Calculate directory path
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// API routes
apiRouter.get('/hello', (req, res) => {
  res.send('<p class="text-indigo-500">Hello</p>')
})

export default apiRouter
