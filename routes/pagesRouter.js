import { Router } from 'express'
import path from 'path'
import __dirname from '../utilities/__dirname.js'

const pagesRouter = Router()

// * GET / - Home page
pagesRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

export default pagesRouter
