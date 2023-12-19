import ILoginResponse from '../interfaces/ILoginResponse'
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

const getCrew = async (id: string | null, employee: string | null) => {
  try {
    return await api.post('/login', { id, employee })
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

const storeCrewInlocal = (crew: ILoginResponse) => {
  const jsonCrew = JSON.stringify(crew)
  window.localStorage.setItem('CREW', jsonCrew)
}

const getCrewFromLocal = (): ILoginResponse | null => {
  const localCrew = window.localStorage.getItem('CREW')
  if (!localCrew) return null
  const jsonLocalCrew: ILoginResponse = JSON.parse(localCrew)
  if (isCrewExpired(jsonLocalCrew)) return null
  return jsonLocalCrew
}

const isCrewExpired = (crew: ILoginResponse) => {
  const now = new Date().toISOString()
  if (!crew.tokenPeremption) return true
  return crew.tokenPeremption < now
}

export {
  getCrewByCrewId,
  getAllCrews,
  getCrew,
  storeCrewInlocal,
  getCrewFromLocal,
  isCrewExpired,
}
