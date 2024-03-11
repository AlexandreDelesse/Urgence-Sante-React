import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../contexts/User.context'
import { CrewServiceLocal } from '../../services/Crew/CrewServiceLocal'
import { LoginService } from '../../services/Login/LoginService'

export default function UserLoginViewModel() {
  const loginService = LoginService()
  const crewService = CrewServiceLocal()

  const navigate = useNavigate()

  const [code, setCode] = useState('')
  const [name, setName] = useState('')

  const submit = async () => {
    try {
      const crew = await loginService.PostLogin(parseInt(code), name)
      crewService.StoreCrew(crew)
      navigate('/')
    } catch (error) {}
  }

  return { code, name, setCode, setName, submit }
}
