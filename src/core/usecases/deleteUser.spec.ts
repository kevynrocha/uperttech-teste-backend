import { MockRepository } from '../../app/data/MockRepository'
import { AuthTokenData } from '../entities/AuthToken'
import { User } from '../entities/User'
import { deleteUser } from './deleteUser'

describe('deleteUser test', () => {
  const repository = MockRepository<User>('users_spec')
  const user = User({
    name: 'Test user',
    email: 'user@test.com',
    password: '1234'
  })

  beforeAll(done => {
    repository.save(user).then(done)
  })

  const deleteUserUC = deleteUser(repository)

  it('Deve falhar caso o usuário não esteja autentificado', () => {
    expect(deleteUserUC(undefined, user.id)).rejects.toBeDefined()
  })

  it('Deve deletar um usuário', async () => {
    const authToken: AuthTokenData = { id: user.id }

    await expect(deleteUserUC(authToken, user.id)).resolves.toBeUndefined()
    await expect(repository.find()).resolves.toStrictEqual([])
  })
})
