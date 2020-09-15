import { Core as createCore, Todo, User } from '../core'

import { MockRepository } from './data/MockRepository'

export const AppCore = createCore({
  userRepository: MockRepository<User>('users'),
  todoRepository: MockRepository<Todo>('todos')
})
