import { useQuery } from 'react-query'
import { getDriver } from '../../services/driver.service'
import { useContext } from 'react'
import UserContext from '../../contexts/User.context'
import { GetDriverDTO } from '../../components/shared/driverSwap/model/GetDriverDTO'
import { Driver } from '../../components/shared/driverSwap/model/Driver'
import { CrewServiceLocal } from '../../services/Crew/CrewServiceLocal'

export default function useGetDriver(onSuccess: (data: GetDriverDTO) => any) {
  const crew = CrewServiceLocal().GetCrew()
  const crewId = crew?.crewId || null
  return useQuery(['driver', crewId], () => getDriver(crewId), {
    onSuccess: (data: GetDriverDTO) => onSuccess(data),
  })
}
