import React from 'react'
import { Container } from 'react-bootstrap'
import EmployeesTable from '../../components/tables/EmployeesTable'
import { getEmployees } from '../../services/employee.service'
export default function Employees() {
  const employees = getEmployees()

  return (
    <Container>
      <EmployeesTable employees={employees} />
    </Container>
  )
}
