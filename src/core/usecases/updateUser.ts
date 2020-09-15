import { hashPassword, User, UserData } from '../entities/User'
import { Repository } from '../data/Repository'
import {
  CoreError,
  NotFoundError,
  PermissionError
} from '../entities/CoreError'
import { AuthTokenData } from '..'

export const updateUser = (userRepository: Repository<User>) => async (
  authTokenData: AuthTokenData | undefined,
  userId: User['id'],
  userData: Partial<UserData>
): Promise<void> => {
  if (!authTokenData) {
    throw PermissionError('A requisição deve estar autentificada')
  }

  const user = await userRepository.findOne({ id: userId })

  if (!user) {
    throw NotFoundError('Usuário inexistente')
  }

  if (authTokenData.id !== user.id) {
    throw PermissionError(
      'O usuário fornecido não tem permissão para executar essa operação'
    )
  }

  const { password } = userData

  if (password) {
    userData.password = hashPassword(password)
  }

  try {
    await userRepository.update({ id: userId }, userData)
  } catch (error) {
    throw CoreError()
  }
}
