import { CoreError } from '../../core'

export interface HTTPError extends Error {
  status: number
}

export interface HTTPErrorConstructor {
  (status: number, message: string): HTTPError
  badRequest: (message?: string) => HTTPError
  unauthorized: (message?: string) => HTTPError
  forbidden: (message?: string) => HTTPError
  notFound: (message?: string) => HTTPError
  internal: (message?: string) => HTTPError
}

export const HTTPError: HTTPErrorConstructor = Object.assign(
  (status: number, message: string): HTTPError => ({
    name: 'HTTPError',
    status,
    message
  }),
  {
    badRequest: (message = 'Requisição mal-formatada') =>
      HTTPError(400, message),
    unauthorized: (message = 'Credenciais inválidas') =>
      HTTPError(401, message),
    forbidden: (message = 'Requisição não autorizada') =>
      HTTPError(403, message),
    notFound: (message = 'Não encontrado') => HTTPError(404, message),
    internal: (message = 'Erro interno') => HTTPError(500, message)
  }
)

export const CoreHTTPErrorMapper = (coreError: CoreError): HTTPError => {
  if (coreError.name === 'PermissionError') {
    return HTTPError.forbidden(coreError.message)
  }

  if (coreError.name === 'NotFoundError') {
    return HTTPError.notFound(coreError.message)
  }

  if (coreError.name === 'BadDataError') {
    return HTTPError.notFound(coreError.message)
  }

  return HTTPError.internal(coreError.message)
}

export const instanceofCoreError = (error: Error): error is CoreError =>
  error.name === 'CoreError' ||
  error.name === 'PermissionError' ||
  error.name === 'NotFoundError' ||
  error.name === 'BadDataError'

export const instanceofHTTPError = (error: Error): error is HTTPError =>
  error.name === 'HTTPError'
