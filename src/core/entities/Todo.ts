import { v4 } from 'uuid'
export interface Todo {
  readonly id: string
  userId: string
  description: string
  completed: boolean
}

export type TodoData = Pick<Todo, 'userId' | 'description' | 'completed'>

export const Todo = ({ userId, description, completed }: TodoData): Todo => ({
  id: v4(),
  userId,
  description,
  completed
})
