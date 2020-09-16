/* eslint-disable prettier/prettier */
import { Router } from '@awaitjs/express'
import { TodoData } from '../../core'
import { AppCore } from '../AppCore'
import { authenticateRequest } from '../middlewares/authenticateRequest'
import { Request, Response } from 'express'

const router = Router()

router.getAsync(
  '/',
  authenticateRequest,
  async (req: Request, res: Response): Promise<Response> => {
    const authTokenData = req.tokenData

    const todos = await AppCore.getTodos(authTokenData)

    return res.send(todos)
  }
)

router.postAsync(
  '/',
  authenticateRequest,
  async (req: Request, res: Response): Promise<Response> => {
    const authTokenData = req.tokenData
    const { userId, description, completed } = req.body

    const todoData: TodoData = { userId, description, completed }

    const todo = await AppCore.createTodo(authTokenData, todoData)

    return res.send(todo)
  }
)

router.putAsync(
  '/:id',
  authenticateRequest,
  async (req: Request, res: Response): Promise<Response> => {
    const authTokenData = req.tokenData
    const { id } = req.params
    const { userId, description, completed } = req.body

    const todoData: TodoData = { userId, description, completed }

    await AppCore.updateTodo(authTokenData, id, todoData)

    return res.sendStatus(201)
  }
)

router.deleteAsync(
  '/:id',
  authenticateRequest,
  async (req: Request, res: Response): Promise<Response> => {
    const authTokenData = req.tokenData
    const { id } = req.params

    await AppCore.deleteTodo(authTokenData, id)

    return res.sendStatus(200)
  }
)

export { router }


