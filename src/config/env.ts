import dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({
  path: resolve(__dirname, '..', '..', '.env')
})

export const { PORT, JWT_SECRET } = process.env
