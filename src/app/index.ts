import express from 'express'
import { decorateApp } from '@awaitjs/express'
import cors from 'cors'
import { router } from './routes'

const app = decorateApp(express())

app.use(express.json())
app.use(cors())
app.use(router)

export { app }
