import { Repository } from '../data/Repository'
import { Todo } from '../entities/Todo'
import {
  CoreError,
  NotFoundError,
  PermissionError
} from '../entities/CoreError'
import { AuthTokenData } from '..'

export const deleteTodo = (todoRepository: Repository<Todo>) => async (
  authTokenData: AuthTokenData | undefined,
  id: Todo['id']
): Promise<void> => {
  if (!authTokenData) {
    throw PermissionError('A requisição deve estar autentificada')
  }

  const todo = await todoRepository.findOne({ id })

  if (!todo) {
    throw NotFoundError('Tarefa inexistente')
  }

  if (authTokenData.id !== todo.userId) {
    throw PermissionError(
      'O usuário fornecido não tem permissão para executar essa operação'
    )
  }

  try {
    await todoRepository.delete({ id: todo.id })
  } catch (error) {
    throw CoreError()
  }
}
