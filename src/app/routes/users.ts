/* eslint-disable prettier/prettier */
import { Router } from '@awaitjs/express'
import { UserAuthenticationData, UserData } from '../../core'
import { AppCore } from '../AppCore'
import { authenticateRequest } from '../middlewares/authenticateRequest'
import { Request, Response } from 'express'

const router = Router()

router.getAsync(
  '/',
  authenticateRequest,
  async (req: Request, res: Response): Promise<Response> => {
    const authTokenData = req.tokenData

    const users = await AppCore.getUsers(authTokenData)

    return res.send(users)
  }
)

router.postAsync(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const { email, password, name } = req.body

    const userData: UserData = { email, password, name }

    const user = await AppCore.createUser(userData)

    return res.send(user)
  }
)

router.putAsync(
  '/:id',
  authenticateRequest,
  async (req: Request, res: Response): Promise<Response> => {
    const authTokenData = req.tokenData
    const { id } = req.params
    const { email, password, name } = req.body

    const userData: UserData = { email, password, name }

    await AppCore.updateUser(authTokenData, id, userData)

    return res.sendStatus(201)
  }
)

router.deleteAsync(
  '/:id',
  authenticateRequest,
  async (req: Request, res: Response): Promise<Response> => {
    const authTokenData = req.tokenData
    const { id } = req.params

    await AppCore.deleteUser(authTokenData, id)

    return res.sendStatus(200)
  }
)

router.postAsync(
  '/authenticate',
  async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body

    const userData: UserAuthenticationData = { email, password }

    const tokenData = await AppCore.authenticateUser(userData)

    return res.send(tokenData)
  }
)

export { router }
