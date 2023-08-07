import React from 'react'
import { Container } from 'react-bootstrap'
import MissionList from '../../components/mission/MissionList'

export default function Mission() {
  return (
    <Container>
      <h3 className="text-center m-3">Liste des missions</h3>
      <MissionList />
    </Container>
  )
}
