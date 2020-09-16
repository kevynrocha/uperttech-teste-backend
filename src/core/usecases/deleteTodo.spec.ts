import { MockRepository } from '../../app/data/MockRepository'
import { AuthTokenData } from '../entities/AuthToken'
import { Todo } from '../entities/Todo'
import { deleteTodo } from './deleteTodo'

describe('deleteTodo test', () => {
  const todoRepository = MockRepository<Todo>('todos_spec')

  const todoUserId = 'userid'
  const todo = Todo({
    userId: 'userid',
    description: 'description test',
    completed: false
  })

  beforeAll(done => {
    todoRepository.save(todo).then(done)
  })

  const deleteTodoUC = deleteTodo(todoRepository)

  it('Deve falhar caso o usuário não esteja autentificado', () => {
    expect(deleteTodoUC(undefined, todo.id)).rejects.toBeDefined()
  })

  it('Deve deletar uma tarefa', async () => {
    const authToken: AuthTokenData = { id: todoUserId }

    await expect(deleteTodoUC(authToken, todo.id)).resolves.toBeUndefined()
    await expect(todoRepository.find()).resolves.toStrictEqual([])
  })
})
