import path from 'path'
import { fileURLToPath } from 'url'

// Calculate directory path
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default __dirname
