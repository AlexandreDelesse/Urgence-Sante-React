import { CrewDTO } from '../../interfaces/api/login/CrewDTO'

export interface ICrewService {
  GetCrew: () => CrewDTO | null
  StoreCrew: (crew: CrewDTO) => any
}
