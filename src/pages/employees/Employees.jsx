import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate, Outlet } from "react-router-dom";
import EmployeesTable from "../../components/tables/EmployeesTable";
import { getEmployees } from "../../services/employee.service";
export default function Employees() {
  const navigate = useNavigate();
  const employees = getEmployees();
  console.log("employes", employees);

  return (
    <Container>
      <Button onClick={() => navigate("nouveau-vehicule")} className="my-3">
        Nouveau vehicule
      </Button>
      {/* <SearchBar onFilterChange={handleOnFilterChange} /> */}
      <EmployeesTable employees={employees} />
      <Outlet />
    </Container>
  );
}
