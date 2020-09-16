import { MockRepository } from '../../app/data/MockRepository'
import { AuthTokenData } from '../entities/AuthToken'
import { Todo } from '../entities/Todo'
import { getTodos } from './getTodos'

describe('getTodos test', () => {
  const todoRepository = MockRepository<Todo>('todos_spec')

  const todoUserId = 'userid'
  const todo = Todo({
    userId: 'userId test',
    description: 'description test',
    completed: false
  })

  beforeAll(done => {
    todoRepository.save(todo).then(done)
  })

  const getTodosUC = getTodos(todoRepository)

  it('Deve falhar caso o usuário não esteja autentificado', () => {
    expect(getTodosUC(undefined)).rejects.toBeDefined()
  })

  it('Deve retornar os todos cadastrados', () => {
    const authToken: AuthTokenData = { id: todoUserId }

    expect(getTodosUC(authToken)).resolves.toEqual([todo])
  })
})
