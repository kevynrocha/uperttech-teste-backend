import { Todo } from '../entities/Todo'
import { Repository } from '../data/Repository'
import { PermissionError } from '../entities/CoreError'
import { AuthTokenData } from '../entities/AuthToken'

export const getTodos = (todoRepository: Repository<Todo>) => async (
  authTokenData: AuthTokenData | undefined
): Promise<Todo[]> => {
  if (!authTokenData) {
    throw PermissionError('A requisição deve estar autentificada')
  }

  const todos = await todoRepository.find()
  return todos
}
