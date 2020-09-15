import { v4 } from 'uuid'
import bcrypt from 'bcrypt'

export interface User {
  readonly id: string
  name: string
  email: string
  password: string
}

export type UserData = Pick<User, 'name' | 'email' | 'password'>

export const hashPassword = (plainPassword: string): string =>
  bcrypt.hashSync(plainPassword, 2)

export const comparePassword = (user: User) => (
  password: string
): Promise<boolean> => bcrypt.compare(password, user.password)

export const User = ({ name, email, password }: UserData): User => ({
  id: v4(),
  name,
  email,
  password: hashPassword(password)
})
