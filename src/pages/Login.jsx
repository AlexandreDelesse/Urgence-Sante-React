import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getCrew, getCrewByCrewId } from '../services/crew.service'
import AsyncDataComponent from '../components/shared/AsyncDataComponent'
import UserContext from '../contexts/User.context'
import useGetCrewToken from '../hooks/query/useGetCrewToken'

export default function Login() {
  const params = useParams()
  const { setCrew } = useContext(UserContext)

  const [id, employee] = params.crewid.split('&')

  const crewToken = useGetCrewToken(id, employee, ({ data }) => setCrew(data))

  return (
    <AsyncDataComponent
      query={crewToken}
      onSuccess={() => <Navigate to="/" />}
    />
  )
}
