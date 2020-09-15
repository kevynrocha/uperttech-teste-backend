import { MockRepository } from '../../app/data/MockRepository'
import { User } from '../entities/User'
import { createUser } from './createUser'

describe('createUser test', () => {
  const repository = MockRepository<User>('users_spec')

  const anotherUserData = {
    name: 'Test user',
    email: 'user@test.com',
    password: '1234'
  }

  const anotherUser = User(anotherUserData)

  beforeAll(done => {
    repository.save(anotherUser).then(done)
  })

  const createUserUC = createUser(repository)

  it('Deve falhar caso o e-mail já tenha sido cadastrado', () => {
    expect(createUserUC(anotherUserData)).rejects.toBeDefined()
  })

  it('Deve criar um novo usuário', async () => {
    const newUserData = {
      name: 'Test user',
      email: 'newuser@test.com',
      password: '1234'
    }

    await expect(createUserUC(newUserData)).resolves.toBeDefined()

    await expect(repository.count()).resolves.toEqual(2)
  })
})
