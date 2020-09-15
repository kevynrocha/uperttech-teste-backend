import { MockRepository } from '../../app/data/MockRepository'
import { AuthTokenData } from '../entities/AuthToken'
import { Todo } from '../entities/Todo'
import { updateTodo } from './updateTodo'

describe('updateTodo test', () => {
  const todoRepository = MockRepository<Todo>('todos_spec')

  const todoUserId = 'userid'
  const todo = Todo({
    // TODO: Insira aqui os atributos da sua entidade Todo
  })

  const updateTodoData = {
    // TODO: Insira aqui os atributos atualizados do seu Todo
  }

  beforeAll(done => {
    todoRepository.save(todo).then(done)
  })

  const updateTodoUC = updateTodo(todoRepository)

  it('Deve falhar caso o usuário não esteja autentificado', async () => {
    await expect(
      updateTodoUC(undefined, todo.id, updateTodoData)
    ).rejects.toBeDefined()
  })

  it('Deve atualizar um usuário', async () => {
    const authToken: AuthTokenData = { id: todoUserId }

    await expect(
      updateTodoUC(authToken, todo.id, updateTodoData)
    ).resolves.toBeUndefined()

    const updatedTodo = await todoRepository.findOne({ id: todo.id })

    // TODO: Testar atributo atualizado
    expect(updatedTodo?.name).toBe(updateTodoData.name)
  })
})
