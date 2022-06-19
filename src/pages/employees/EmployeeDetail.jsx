import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useParams, Navigate } from "react-router-dom";
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
      <h2 className="text-center">EmployeeDetail</h2>
      <Tabs defaultActiveKey="infos">
        <Tab eventKey="infos" title="Infos">
          <EmployeeInfos employee={employee} />
        </Tab>
        <Tab eventKey="contrats" title="Contrats">
          <EmployeeContrats />
        </Tab>
        <Tab eventKey="absences" title="Absences">
          <EmployeeAbsences />
        </Tab>
      </Tabs>
    </div>
  );
}
