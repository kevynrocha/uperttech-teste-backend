import { MockRepository } from '../../app/data/MockRepository'
import { User } from '../entities/User'
import { authenticateUser } from './authenticateUser'
import { createUser } from './createUser'

describe('createUser test', () => {
  const repository = MockRepository<User>('users_spec')

  const userData = {
    name: 'Test user',
    email: 'user@test.com',
    password: '1234'
  }

  const user = User(userData)

  beforeAll(done => {
    repository.save(user).then(done)
  })

  const authenticateUserUC = authenticateUser(repository)

  it('Deve falhar caso o e-mail não tenha sido cadastrado', () => {
    const wrongUserData = { ...userData, email: 'wrong@test.com' }

    expect(authenticateUserUC(wrongUserData)).rejects.toBeDefined()
  })

  it('Deve falhar caso a senha seja incorreta', () => {
    const wrongUserData = { ...userData, password: 'wrongpass' }

    expect(authenticateUserUC(wrongUserData)).rejects.toBeDefined()
  })

  it('Deve retornar um token de acesso', async () => {
    await expect(authenticateUserUC(userData)).resolves.toBeDefined()
  })
})
