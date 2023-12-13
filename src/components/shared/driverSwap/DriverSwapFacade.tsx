import React, { useContext } from 'react'
import UserContext from '../../../contexts/User.context'
import useGetDriver from '../../../hooks/query/useGetDriver'
import AsyncDataComponent from '../AsyncDataComponent'
import DriverSwap from './DriverSwap'

export default function DriverSwapFacade() {
  const { crew } = useContext(UserContext)
  console.log(crew)
  const crewToken = crew?.token || ''

  const driverQuery = useGetDriver(crewToken)
  console.log(driverQuery)

  return <div>Coucou</div>
}
