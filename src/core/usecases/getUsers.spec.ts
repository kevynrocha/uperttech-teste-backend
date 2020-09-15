import { MockRepository } from '../../app/data/MockRepository'
import { AuthTokenData } from '../entities/AuthToken'
import { User } from '../entities/User'
import { getUsers } from './getUsers'

describe('getUsers test', () => {
  const repository = MockRepository<User>('users_spec')
  const user = User({
    name: 'Test user',
    email: 'user@test.com',
    password: '1234'
  })

  beforeAll(done => {
    repository.save(user).then(done)
  })

  const getUsersUC = getUsers(repository)

  it('Deve falhar caso o usuário não esteja autentificado', () => {
    expect(getUsersUC(undefined)).rejects.toBeDefined()
  })

  it('Deve retornar os usuários', () => {
    const authToken: AuthTokenData = { id: user.id }

    expect(getUsersUC(authToken)).resolves.toEqual([user])
  })
})
