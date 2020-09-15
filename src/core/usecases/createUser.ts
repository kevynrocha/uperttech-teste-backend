import { Repository } from '../data/Repository'
import { User, UserData } from '../entities/User'
import { CoreError, BadDataError } from '../entities/CoreError'

export const createUser = (userRepository: Repository<User>) => async (
  userData: UserData
): Promise<User> => {
  const anotherUser = await userRepository.findOne({ email: userData.email })

  if (anotherUser) {
    throw BadDataError('Este e-mail já foi cadastrado')
  }

  const user = User({
    email: userData.email,
    password: userData.password,
    name: userData.name
  })

  try {
    await userRepository.save(user)

    return user
  } catch (error) {
    throw CoreError()
  }
}
