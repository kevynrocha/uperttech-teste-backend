import { MockRepository } from '../../app/data/MockRepository'
import { AuthTokenData } from '../entities/AuthToken'
import { User } from '../entities/User'
import { updateUser } from './updateUser'

describe('updateUser test', () => {
  const repository = MockRepository<User>('users_spec')
  const user = User({
    name: 'Test user',
    email: 'user@test.com',
    password: '1234'
  })

  const updateUserData = {
    name: 'Updated test user'
  }

  beforeAll(done => {
    repository.save(user).then(done)
  })

  const updateUserUC = updateUser(repository)

  it('Deve falhar caso o usuário não esteja autentificado', async () => {
    await expect(
      updateUserUC(undefined, user.id, updateUserData)
    ).rejects.toBeDefined()
  })

  it('Deve atualizar um usuário', async () => {
    const authToken: AuthTokenData = { id: user.id }

    await expect(
      updateUserUC(authToken, user.id, updateUserData)
    ).resolves.toBeUndefined()

    const updatedUser = await repository.findOne({ id: user.id })

    expect(updatedUser?.name).toBe(updateUserData.name)
  })
})
