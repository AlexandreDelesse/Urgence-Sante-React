import React from 'react'
import IApiGetDriver from '../../../interfaces/api/IapiGetDriver'
import IDriverModel from '../../../interfaces/model/IDriverModel'
import DriverSwapView from './DriverSwapView'

interface IDriverSwapFacadeProps extends IApiGetDriver {
  onSwapDriver: (driverId: number, vehicleId: number) => void
  isLoading: boolean
}

export default function DriverSwapFacade({
  changeDate,
  driversCollection,
  selectedDriverID,
  vehicleModel,
  isLoading,
  onSwapDriver,
}: IDriverSwapFacadeProps) {
  const date = changeDate ? new Date(changeDate) : new Date()
  const displayTimeFrom = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
  const currentDriver = selectedDriverID
    ? driversCollection.find((el) => el.driverId === selectedDriverID)
    : driversCollection[0]

  const currentDriverName = currentDriver?.driverName

  const getCurrentDriverIndex = (driverId: number) =>
    driversCollection.findIndex((el) => el.driverId === driverId)

  const getNextDriver = (driverId: number | undefined): IDriverModel | null => {
    if (!driverId) return null
    let currentDriverIndex = getCurrentDriverIndex(driverId)
    let nextDriverIndex =
      currentDriverIndex >= driversCollection.length - 1
        ? 0
        : currentDriverIndex + 1
    return driversCollection[nextDriverIndex]
  }

  const swapDriver = () => {
    let nextDriver = getNextDriver(currentDriver?.driverId)
    if (!nextDriver || currentDriver?.driverId === nextDriver.driverId) return
    onSwapDriver(nextDriver.driverId, vehicleModel.vehicleID)
  }

  return (
    <DriverSwapView
      onClick={swapDriver}
      label={currentDriverName}
      isLoading={isLoading}
      fromTime={displayTimeFrom}
    />
  )
}
