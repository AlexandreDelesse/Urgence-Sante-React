import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { Form, Button, Alert, Spinner } from 'react-bootstrap'
import { useQuery } from 'react-query'
import {
  Navigate,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from 'react-router-dom'
import AsyncDataComponent from '../components/shared/AsyncDataComponent'
import Loader from '../components/shared/Loader'
import UserContext from '../contexts/User.context'
import { getCrewByCrewId } from '../services/crew.service'
import { login } from '../services/user.service'

export default function Login() {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()

  const crewToken = useQuery({
    queryKey: ['crewToken', params.crewid],
    queryFn: () => getCrewByCrewId(params.crewid),
  })

  if (crewToken.isLoading) return <Loader loadingMessage="Authentification.." />

  if (crewToken.isSuccess) return <Navigate to="/" />

  if (crewToken.isError)
    return (
      // form as div to prevent trigger form on pressing 'enter' key
      <div>
        <p>This is login page</p>
        <p>And an error occured</p>
      </div>
    )
}
