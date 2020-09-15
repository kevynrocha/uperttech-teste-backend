import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import { JWT_SECRET } from '../../config/env'

export type AuthTokenData = {
  id: string
}

type AuthToken = string

export const AuthToken = ({
  tokenData,
  expiresIn = '12h'
}: {
  tokenData: AuthTokenData
  expiresIn: string
}): AuthToken =>
  jwt.sign(tokenData, JWT_SECRET, {
    expiresIn
  })

export const verifyToken = (token: AuthToken): Promise<AuthTokenData> =>
  promisify(jwt.verify)(token, JWT_SECRET) as Promise<AuthTokenData>
