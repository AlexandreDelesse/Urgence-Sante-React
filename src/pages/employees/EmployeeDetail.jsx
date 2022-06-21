import React from "react";
import { Container } from "react-bootstrap";
import { useParams, Navigate, Routes, Route, Outlet } from "react-router-dom";
import EmployeeNavbar from "../../routing/EmployeeNavbar";
import { getEmployeeById } from "../../services/employee.service";
import EmployeeAbsences from "./EmployeeAbsences";
import EmployeeContrats from "./EmployeeContrats";
import EmployeeInfos from "./EmployeeInfos";

export default function EmployeeDetail() {
  const { id } = useParams();

  const employee = getEmployeeById(id);

  if (!employee) return <Navigate to="/404" />;

  return (
    <div>
      <h2 className="mt-3 text-center">{employee.name}</h2>
      <EmployeeNavbar />
      <Routes>
        <Route index element={<EmployeeInfos employee={employee} />} />
        <Route
          path="contrats"
          element={<EmployeeContrats contrats={employee.contrats} />}
        />
        <Route
          path="absences"
          element={<EmployeeAbsences absences={employee.absences} />}
        />
      </Routes>
    </div>
  );
}

