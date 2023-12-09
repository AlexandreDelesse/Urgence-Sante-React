import { api } from './api.config'
import { storeDrivers, storeToken } from './user.service'

/**
 * Retourne un token pour l'équipage identifié avec un id et un nom d'employée
 * @param {String} crewId
 * @returns CrewToken as String
 */
const getCrewByCrewId = async (crewId: string) => {
  try {
    const [id, employee] = crewId.split('&')
    const { data: resp } = await api.post('/login', {
      id,
      employee,
    })
    const drivers = [resp.employee1, resp.employee2]
    storeToken(resp.token)
    storeDrivers(drivers)
    return resp
  } catch (error) {
    throw error
  }
}

const getCrew = async (crewId: string, employee: string) => {
  try {
    return await api.post('/login', {
      id: crewId,
      employee,
    })
  } catch (error) {
    throw error
  }
}

const getAllCrews = async () => {
  try {
    return await api.get('Login')
  } catch (error) {
    throw error
  }
}

export { getCrewByCrewId, getAllCrews, getCrew }
