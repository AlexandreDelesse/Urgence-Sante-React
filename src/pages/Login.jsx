import React from 'react'
import { useQuery } from 'react-query'
import { Navigate, useParams } from 'react-router-dom'
import { getCrewByCrewId } from '../services/crew.service'
import AsyncDataComponent from '../components/shared/AsyncDataComponent'
import useGetCrewToken from '../hooks/query/useGetCrewToken'

export default function Login() {
  const params = useParams()
  const crewToken = useGetCrewToken(params.crewId)

  return (
    <AsyncDataComponent
      query={crewToken}
      onSuccess={() => <Navigate to="/" />}
    />
  )
}
