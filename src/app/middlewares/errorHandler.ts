/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import {
  instanceofHTTPError,
  instanceofCoreError,
  CoreHTTPErrorMapper,
  HTTPError
} from '../adapters/HTTPError'

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  console.log(error.stack)

  if (instanceofHTTPError(error)) {
    return res.status(error.status).send({ message: error.message })
  }

  if (instanceofCoreError(error)) {
    const httpError = CoreHTTPErrorMapper(error)

    return res.status(httpError.status).send({ message: httpError.message })
  }

  const internal = HTTPError.internal()

  return res.status(internal.status).send({ message: internal.message })
}
