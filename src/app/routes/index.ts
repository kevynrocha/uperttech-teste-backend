import { router as usersRouter } from './users'
import { router as todosRouter } from './todos'
import { Router } from '@awaitjs/express'
import { errorHandler } from '../middlewares/errorHandler'

const router = Router()

const v1 = Router()
v1.use('/users', usersRouter)
v1.use('/todos', todosRouter)
v1.use(errorHandler)

router.use('/v1', v1)

export { router }
