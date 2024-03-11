import { CrewDTO } from '../../interfaces/api/login/CrewDTO'
import { GetLoginDTO } from '../../interfaces/api/login/GetLoginDTO'
import { api } from '../api.config'
import { ILoginService } from './ILoginService'

const LOGIN_API_URL = 'Login'

export const LoginService = (): ILoginService => {
  const GetLogin = async (): Promise<GetLoginDTO> => {
    try {
      const axiosReponse = await api.get(LOGIN_API_URL)
      return axiosReponse.data
    } catch (error) {
      throw error
    }
  }

  const PostLogin = async (id: number, employee: string) => {
    try {
      const axiosReponse = await api.post(LOGIN_API_URL, { id, employee })
      return addTokenPeremption(axiosReponse.data)
    } catch (error) {
      throw error
    }
  }

  const addTokenPeremption = (crew: CrewDTO) => {
    const twelveHourLater = new Date()
    twelveHourLater.setHours(twelveHourLater.getHours() + 12)
    crew.tokenPeremption = twelveHourLater.toISOString()
    return crew
  }

  return {
    GetLogin,
    PostLogin,
  }
}
