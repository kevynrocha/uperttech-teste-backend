import { MockRepository } from '../../app/data/MockRepository'
import { AuthTokenData } from '../entities/AuthToken'
import { Todo } from '../entities/Todo'
import { deleteTodo } from './deleteTodo'

describe('deleteTodo test', () => {
  const todoRepository = MockRepository<Todo>('todos_spec')

  const todoUserId = 'userid'
  const todo = Todo({
    // TODO: Insira aqui os atributos da sua entidade Todo
  })

  beforeAll(done => {
    todoRepository.save(todo).then(done)
  })

  const deleteTodoUC = deleteTodo(todoRepository)

  it('Deve falhar caso o usuário não esteja autentificado', () => {
    expect(deleteTodoUC(undefined, todo.id)).rejects.toBeDefined()
  })

  it('Deve deletar um todo', async () => {
    const authToken: AuthTokenData = { id: todoUserId }

    await expect(deleteTodoUC(authToken, todoUserId)).resolves.toBeUndefined()
    await expect(todoRepository.find()).resolves.toStrictEqual([])
  })
})
