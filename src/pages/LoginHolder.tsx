import React, { useContext } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import AsyncDataComponent from '../components/shared/AsyncDataComponent'
import Loader from '../components/shared/Loader'
import CrewContext from '../contexts/Crew.context'
import useGetCrewToken from '../hooks/query/useGetCrewToken'
import { storeToken } from '../services/user.service'

export default function LoginHolder() {
  const params = useParams()
  const { setCrew } = useContext(CrewContext)

  const crewQuery = useGetCrewToken(params.crewid || '')
  // TODO: Trouver une solution sécurisée pour stocker les infos utilisateurs


  if (crewQuery.isLoading) return <Loader loadingMessage="Authentification" />

  if (crewQuery.isError) return <div>Une erreur est apparue</div>

  if (crewQuery.isSuccess) {
    const { data: crew } = crewQuery.data
    setCrew(crew)
    storeToken(crew.token)
    return <Navigate to="/" />
  }
}
