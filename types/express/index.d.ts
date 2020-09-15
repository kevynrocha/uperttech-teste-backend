// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthTokenData } from '../../src/core'

declare global {
  namespace Express {
    export interface Request {
      tokenData?: AuthTokenData
    }
  }
}
