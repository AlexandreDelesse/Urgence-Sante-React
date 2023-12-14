import { Skeleton } from '@mui/material'
import { Box } from '@mui/system'
import { useContext } from 'react'
import UserContext from '../../../contexts/User.context'
import useDriverSwapMutation from '../../../hooks/mutation/useDriverSwapMutation'
import useGetDriver from '../../../hooks/query/useGetDriver'
import IApiGetDriver from '../../../interfaces/api/IapiGetDriver'
import AsyncDataComponent from '../AsyncDataComponent'
import DriverSwapFacade from './DriverSwapFacade'

export default function DriverSwapWidget() {
  const { crew } = useContext(UserContext)
  const crewId = crew?.crewId || null
  const driverQuery = useGetDriver(crewId)

  const driverSwapMutation = useDriverSwapMutation(crewId)

  const onDriverSwap = (driverId: number, vehicleId: number) => {
    driverSwapMutation.mutate({ driverId, vehicleId })
  }

  const onSuccess = (apiResponse: IApiGetDriver) => (
    <DriverSwapFacade
      onSwapDriver={onDriverSwap}
      changeDate={apiResponse.changeDate}
      vehicleModel={apiResponse.vehicleModel}
      isLoading={driverSwapMutation.isLoading}
      driversCollection={apiResponse.driversCollection}
      selectedDriverID={apiResponse.selectedDriverID}
    />
  )

  const onLoading = () => (
    <Skeleton variant="rectangular" height={50} width="100%" />
  )

  const onError = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 50,
      }}
      bgcolor="lightgrey"
    >
      <span>Erreur de chauffeur</span>
    </Box>
  )

  return (
    <AsyncDataComponent
      query={driverQuery}
      onSuccess={({ data: driverQueryResponse }) =>
        onSuccess(driverQueryResponse)
      }
      onLoading={onLoading}
      onError={onError}
    />
  )
}
