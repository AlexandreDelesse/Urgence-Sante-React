import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getCrew, getCrewByCrewId } from '../services/crew.service'
import AsyncDataComponent from '../components/shared/AsyncDataComponent'
import UserContext from '../contexts/User.context'

export default function Login() {
  const params = useParams()
  const { setCrew } = useContext(UserContext)

  const [id, employee] = params.crewid.split('&')

  const crewToken = useQuery({
    queryKey: ['crewToken', id, employee],
    queryFn: () => getCrew(id, employee),
    onSuccess: ({ data }) => {
      setCrew(data)
    },
  })

  return (
    <AsyncDataComponent
      data={crewToken}
      onSuccess={() => <Navigate to="/" />}
    />
  )
}
