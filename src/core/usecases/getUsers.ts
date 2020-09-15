import { User } from '../entities/User'
import { Repository } from '../data/Repository'
import { PermissionError } from '../entities/CoreError'
import { AuthTokenData } from '../entities/AuthToken'

export const getUsers = (userRepository: Repository<User>) => async (
  authTokenData: AuthTokenData | undefined
): Promise<User[]> => {
  if (!authTokenData) {
    throw PermissionError('A requisição deve estar autentificada')
  }

  const users = await userRepository.find()

  return users
}
