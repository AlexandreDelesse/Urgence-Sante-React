import { api } from './api.config'

const pathDriver = '/Driver'

const getDriver = async (crewId: number | null) => {
  try {
    return await api.get(pathDriver, { params: { crewId } })
  } catch (error) {
    throw error
  }
}

const swapDriver = async (driverId: number, vehicleId: number) => {
  try {
    return await api.post(pathDriver, {
      driverId,
      vehicleId,
    })
  } catch (error) {}
}

export { getDriver, swapDriver }
