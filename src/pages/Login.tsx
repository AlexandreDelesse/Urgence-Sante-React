import { useContext } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/shared/Loader'
import UserContext from '../contexts/User.context'
import useGetCrewToken from '../hooks/query/useGetCrewToken'
import { storeCrewInlocal } from '../services/crew.service'
import ILoginResponse from '../interfaces/ILoginResponse'

export default function Login() {
  const { crewid } = useParams()
  const navigate = useNavigate()
  const { setCrew } = useContext(UserContext)

  const [id, employee] = crewid?.split('&') || [null, null]

  const onSuccess = ({ data }: { data: ILoginResponse }) => {
    const crew = data
    const twelveHourLater = new Date()
    twelveHourLater.setHours(twelveHourLater.getHours() + 12)
    crew.tokenPeremption = twelveHourLater.toISOString()
    storeCrewInlocal(crew)
    setCrew(crew)
    navigate('/')
  }
  const goBack = () => navigate(-1)

  useGetCrewToken(id, employee, onSuccess, goBack)

  return <Loader loadingMessage="Authentification" />
}
