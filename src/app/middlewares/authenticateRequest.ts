import { verifyToken } from '../../core/entities/AuthToken'
import { Request, Response, NextFunction } from 'express'

export const authenticateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return next()
  }

  const [, token] = authHeader.split(' ')

  try {
    const tokenData = await verifyToken(token)
    req.tokenData = tokenData
  } catch (err) {}

  return next()
}
