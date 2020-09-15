import { Repository } from '../data/Repository'
import { User, comparePassword } from '../entities/User'
import { AuthToken } from '../entities/AuthToken'
import { CoreError } from '../entities/CoreError'

export interface UserAuthenticationData {
  email: User['email']
  password: User['password']
}

export interface AuthenticationTokenReturn {
  token: string
  expiresIn: string
}

export const authenticateUser = (userRepository: Repository<User>) => async (
  userData: UserAuthenticationData
): Promise<AuthenticationTokenReturn> => {
  const user = await userRepository.findOne({ email: userData.email })

  if (!user) {
    throw CoreError('Credenciais inválidas')
  }

  const result = await comparePassword(user)(userData.password)

  if (!result) {
    throw CoreError('Credenciais inválidas')
  }

  const expiresIn = '12h'

  try {
    const token = AuthToken({
      tokenData: { id: user.id },
      expiresIn
    })

    return { token, expiresIn }
  } catch (error) {
    throw CoreError()
  }
}
