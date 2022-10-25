import React from 'react'
import { useState } from 'react'
import { Form } from 'react-bootstrap'
import VehiculeCardList from '../cardList/VehiculeCardList'
import AsyncDataComponent from '../shared/AsyncDataComponent'
import SearchBar from '../shared/SearchBar'
import VehiculesTable from '../tables/VehiculesTable'

export default function VehiculeList({ asyncVehicules }) {
  const [filters, setFilters] = useState(null)
  const [displayCard, setDisplayCard] = useState(false)

  const handleOnFilterChange = (filter) => {
    setFilters(filter)
  }

  const toggleDisplayCard = () => {
    setDisplayCard(!displayCard)
  }

  return (
    <div>
      <SearchBar onFilterChange={handleOnFilterChange} />
      <DisplayToggler
        toggleDisplay={toggleDisplayCard}
        displayValue={displayCard}
      />
      <AsyncDataComponent
        data={asyncVehicules}
        onSuccess={({ data }) => (
          <>
            {displayCard ? (
              <VehiculeCardList vehicules={data} />
            ) : (
              <VehiculesTable vehicules={data} filters={filters} />
            )}
          </>
        )}
      />
    </div>
  )
}

const DisplayToggler = ({ toggleDisplay, displayValue }) => {
  return (
    <div>
      Affichage
      <Form.Check
        onChange={toggleDisplay}
        isValid={displayValue}
        type="switch"
        id="custom-switch"
        label={displayValue ? 'card' : 'list'}
      />
    </div>
  )
}
