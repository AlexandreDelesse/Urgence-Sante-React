import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { useNavigate, Outlet } from 'react-router-dom'
import useGetVehicules from '../../hooks/getter/useGetVehicules'
import VehiculeList from '../../components/vehicules/VehiculeList'

export default function Vehicules() {
  const navigate = useNavigate()

  const asyncVehicules = useGetVehicules()

  return (
    <Container>
      <Button onClick={() => navigate('nouveau-vehicule')} className="my-3">
        Nouveau vehicule
      </Button>
      <VehiculeList asyncVehicules={asyncVehicules} />

      <Outlet />
    </Container>
  )
}
