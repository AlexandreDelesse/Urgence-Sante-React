import React, { useContext } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/User.context";
import { FiLogOut } from "react-icons/fi";

export default function MainNavbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleOnNavLinkClick = (link) => {
    navigate(link);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => handleOnNavLinkClick("/")}>
          Urgence Sante
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Offcanvas id="basic-navbar-nav" placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="me-auto">
              <NavDropdown title="Ressourses" id="basic-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => handleOnNavLinkClick("vehicules")}
                >
                  Vehicules
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => handleOnNavLinkClick("Personnes")}
                >
                  Personnes
                </NavDropdown.Item>
                {/* <NavDropdown.Divider /> */}
              </NavDropdown>
            </Nav>
            {user ? (
              <Nav>
                <Navbar.Brand>
                  <span onClick={() => handleOnNavLinkClick("user")}>
                    {user.name}
                  </span>
                  <FiLogOut
                    onClick={() => setUser(null)}
                    className="m-auto ms-2"
                    size={16}
                  />
                </Navbar.Brand>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link onClick={() => handleOnNavLinkClick("login")}>
                  Login
                </Nav.Link>
              </Nav>
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
