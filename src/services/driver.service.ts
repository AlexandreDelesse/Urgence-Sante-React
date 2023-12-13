import { api } from './api.config'

const pathDriver = '/Driver'

const getDriver = async (crewId: string) => {
  try {
    return await api.get(pathDriver, { params: { crewId } })
  } catch (error) {
    throw error
  }
}

export { getDriver }
