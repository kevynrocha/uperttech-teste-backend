/* eslint-disable @typescript-eslint/no-explicit-any */
import { Repository, compareQuery, Query } from '../../core/data/Repository'

const MOCK_DB: { [collectionName: string]: any[] } = {}

export const MockRepository = <T>(collectionName: string): Repository<T> => {
  if (!MOCK_DB[collectionName]) {
    MOCK_DB[collectionName] = [] as T[]
  }

  const find = async (query?: Query<T>): Promise<T[]> =>
    MOCK_DB[collectionName].filter(el =>
      query ? compareQuery(query, el) : true
    )

  const findOne = async (query: Query<T>): Promise<T | undefined> =>
    MOCK_DB[collectionName].find(el => compareQuery(query, el))

  const save = async (...data: T[]): Promise<void> => {
    MOCK_DB[collectionName].push(...data)
  }

  const update = async (query: Query<T>, data: Query<T>): Promise<void> => {
    MOCK_DB[collectionName] = MOCK_DB[collectionName].map(el =>
      compareQuery(query, el) ? { ...el, ...data } : el
    )
  }

  const deleteData = async (query: Query<T>): Promise<void> => {
    MOCK_DB[collectionName] = MOCK_DB[collectionName].filter(
      el => !compareQuery(query, el)
    )
  }

  const count = async (): Promise<number> => MOCK_DB[collectionName].length

  return { find, findOne, save, update, delete: deleteData, count }
}
