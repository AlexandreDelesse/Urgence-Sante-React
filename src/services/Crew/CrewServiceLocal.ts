import { CrewDTO } from '../../interfaces/api/login/CrewDTO'
import { ICrewService } from './ICrewService'

const LOCAL_CREW_KEY = 'crew'

export const CrewServiceLocal = (): ICrewService => {
  const GetCrew = () => {
    const localCrew = window.localStorage.getItem(LOCAL_CREW_KEY)
    if (!localCrew) return null
    const jsonLocalCrew: CrewDTO = JSON.parse(localCrew)
    if (isCrewExpired(jsonLocalCrew)) {
      DeleteCrew()
      return null
    }
    return jsonLocalCrew
  }

  const isCrewExpired = (crew: CrewDTO) => {
    const now = new Date().toISOString()
    if (!crew.tokenPeremption) return true
    return crew.tokenPeremption < now
  }

  const DeleteCrew = () => {
    window.localStorage.removeItem(LOCAL_CREW_KEY)
  }

  const StoreCrew = (crew: CrewDTO) => {
    const jsonCrew = JSON.stringify(crew)
    console.log(jsonCrew)
    window.localStorage.setItem(LOCAL_CREW_KEY, jsonCrew)
  }

  return { GetCrew, StoreCrew }
}
