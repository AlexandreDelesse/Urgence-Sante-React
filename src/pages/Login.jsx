import { useContext } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/shared/Loader'
import UserContext from '../contexts/User.context'
import useGetCrewToken from '../hooks/query/useGetCrewToken'

export default function Login() {
  const params = useParams()
  const navigate = useNavigate()
  const { setCrew } = useContext(UserContext)

  const [id, employee] = params.crewid.split('&')

  const onSuccess = ({ data }) => {
    setCrew(data)
    navigate('/')
  }
  const goBack = () => navigate(-1)

  useGetCrewToken(id, employee, onSuccess, goBack)

  return <Loader />
}
