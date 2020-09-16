import { Repository } from '../data/Repository'
import { Todo, TodoData } from '../entities/Todo'
import { BadDataError, CoreError, PermissionError } from '../entities/CoreError'
import { AuthTokenData, User } from '..'

export const createTodo = (todoRepository: Repository<Todo>) => async (
  authTokenData: AuthTokenData | undefined,
  todoData: TodoData
): Promise<Todo> => {
  // if (!authTokenData) {
  //   throw PermissionError('A requisição deve estar autentificada')
  // }

  // if (!anotherUser) {
  //   throw BadDataError(
  //     'Usuário ao qual você deseja criar uma tarefa não existe'
  //   )
  // }

  const todo = Todo({
    userId: todoData.userId,
    description: todoData.description,
    completed: todoData.completed
  })

  try {
    await todoRepository.save(todo)
    return todo
  } catch (error) {
    throw CoreError()
  }
}
