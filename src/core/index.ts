import { Repository } from './data/Repository'

import { AuthTokenData, AuthToken } from './entities/AuthToken'
import { User, UserData } from './entities/User'
import { CoreError } from './entities/CoreError'

import {
  AuthenticationTokenReturn,
  UserAuthenticationData,
  authenticateUser
} from './usecases/authenticateUser'
import { getUsers } from './usecases/getUsers'
import { createUser } from './usecases/createUser'
import { updateUser } from './usecases/updateUser'
import { deleteUser } from './usecases/deleteUser'

import { Todo, TodoData } from './entities/Todo'

import { getTodos } from './usecases/getTodos'
import { createTodo } from './usecases/createTodo'
import { updateTodo } from './usecases/updateTodo'
import { deleteTodo } from './usecases/deleteTodo'

interface CoreDependencies {
  userRepository: Repository<User>
  todoRepository: Repository<Todo>
}

interface Core {
  createUser: (userData: UserData) => Promise<User>

  authenticateUser: (
    userData: UserAuthenticationData
  ) => Promise<AuthenticationTokenReturn>

  getUsers: (authTokenData: AuthTokenData | undefined) => Promise<User[]>

  updateUser: (
    authTokenData: AuthTokenData | undefined,
    userId: User['id'],
    userData: Partial<UserData>
  ) => Promise<void>

  deleteUser: (
    authTokenData: AuthTokenData | undefined,
    userId: User['id']
  ) => Promise<void>

  createTodo: (todoData: TodoData) => Promise<Todo>

  getTodos: (authTokenData: AuthTokenData | undefined) => Promise<Todo[]>

  updateTodo: (
    authTokenData: AuthTokenData | undefined,
    todoId: Todo['id'],
    todoData: Partial<TodoData>
  ) => Promise<void>

  deleteTodo: (
    authTokenData: AuthTokenData | undefined,
    todoId: Todo['id']
  ) => Promise<void>
}

export const Core = ({
  userRepository,
  todoRepository
}: CoreDependencies): Core => ({
  createUser: createUser(userRepository),
  getUsers: getUsers(userRepository),
  authenticateUser: authenticateUser(userRepository),
  updateUser: updateUser(userRepository),
  deleteUser: deleteUser(userRepository),

  createTodo: createTodo(todoRepository),
  getTodos: getTodos(todoRepository),
  updateTodo: updateTodo(todoRepository),
  deleteTodo: deleteTodo(todoRepository)
})

export {
  AuthToken,
  AuthTokenData,
  CoreError,
  UserAuthenticationData,
  Repository,
  User,
  UserData,
  Todo,
  TodoData
}
