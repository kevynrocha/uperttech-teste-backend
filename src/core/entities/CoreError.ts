/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-interface */
export interface CoreError extends Error {}

const getStackTrace = (errorConstructor: Function): string => {
  const error = new Error()

  Error.captureStackTrace(error, errorConstructor)

  return error.stack as string
}

export const CoreError = (message = 'Erro interno'): CoreError => ({
  name: 'CoreError',
  message,
  stack: getStackTrace(CoreError)
})

export interface PermissionError extends CoreError {}

export const PermissionError = (
  message = 'O usuário não possui permissão'
): PermissionError => ({
  name: 'PermissionError',
  message,
  stack: getStackTrace(PermissionError)
})

export interface NotFoundError extends CoreError {}

export const NotFoundError = (message = 'Dado inexistente'): NotFoundError => ({
  name: 'NotFoundError',
  message,
  stack: getStackTrace(NotFoundError)
})

export interface BadDataError extends CoreError {}

export const BadDataError = (message = 'Dado incorreto'): BadDataError => ({
  name: 'BadDataError',
  message,
  stack: getStackTrace(BadDataError)
})
