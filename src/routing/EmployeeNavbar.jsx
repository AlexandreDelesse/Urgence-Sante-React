import React from "react";
import { Nav } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function EmployeeNavbar() {
  const navigate = useNavigate();
  const params = useParams();

  const handleOnNav = (link) => {
    navigate(link, { replace: true });
  };

  return (
    <Nav className="mt-4 justify-content-center fs-5" variant="tabs" fill>
      <Nav.Item>
        <Nav.Link
          active={params["*"] === ""}
          className="text-black"
          onClick={() => handleOnNav("")}
        >
          Infos
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          active={params["*"] === "absences"}
          className="text-black"
          onClick={() => handleOnNav("absences")}
        >
          Absences
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          active={params["*"] === "contrats"}
          className="text-black"
          onClick={() => handleOnNav("contrats")}
        >
          Contrats
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
