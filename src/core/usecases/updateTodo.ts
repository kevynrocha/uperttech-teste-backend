import { Repository } from '../data/Repository'
import {
  CoreError,
  NotFoundError,
  PermissionError
} from '../entities/CoreError'
import { AuthTokenData } from '..'
import { Todo, TodoData } from '../entities/Todo'

export const updateTodo = (todoRepository: Repository<Todo>) => async (
  authTokenData: AuthTokenData | undefined,
  id: Todo['id'],
  todoData: Partial<TodoData>
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

  const updatedTodo = {
    userId: todoData.userId || todo?.userId,
    description: todoData.description || todo?.description,
    completed: todoData.completed || todo?.completed
  }

  try {
    await todoRepository.update({ id }, updatedTodo)
  } catch (error) {
    throw CoreError()
  }
}
