import React from 'react'
import { TbTruckReturn } from 'react-icons/tb'

export default function TransportType({ transportType }) {
  if (transportType === 1) return <TbTruckReturn size={30} />
  return <></>
}
