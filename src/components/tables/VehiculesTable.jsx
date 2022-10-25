import React from 'react'
import { Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import useVehiculeFilter from '../../hooks/filters/useVehiculeFilter'

export default function VehiculesTable({ vehicules, filters }) {
  console.log('this is my vehicules', vehicules)
  const navigate = useNavigate()
  const filteredVehicules = useVehiculeFilter({ list: vehicules, filters })

  const handleOnRowClick = ({ id }) => {
    navigate(`${id}/detail`)
  }

  return (
    <Table striped hover className="my-3" size="sm" responsive="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Nom</th>
          <th>Immat</th>
          <th>Type</th>
          <th>Km</th>
        </tr>
      </thead>
      <tbody>
        {filteredVehicules.map((vehicule) => (
          <tr onClick={() => handleOnRowClick(vehicule)} key={vehicule.id}>
            <td>{vehicule.id}</td>
            <td>{vehicule.name}</td>
            <td>{vehicule.immat}</td>
            <td>{vehicule.type}</td>
            <td>{vehicule.km}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
