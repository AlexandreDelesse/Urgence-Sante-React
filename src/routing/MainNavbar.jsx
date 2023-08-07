import React, { useContext, useState } from "react";
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/User.context";
import { FiLogOut } from "react-icons/fi";

export default function MainNavbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleOnNavLinkClick = (link) => {
    navigate(link);
    setShowOffcanvas(false);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand onClick={() => handleOnNavLinkClick("/")}>
          Urgence Sante
        </Navbar.Brand>
        <Navbar.Toggle
          onClick={() => setShowOffcanvas(true)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Offcanvas
          show={showOffcanvas}
          onHide={() => setShowOffcanvas(false)}
          id="basic-navbar-nav"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="me-auto">
              {/* <Nav.Link onClick={() => handleOnNavLinkClick("vehicules")}>
                Vehicules
              </Nav.Link>
              <Nav.Link onClick={() => handleOnNavLinkClick("employees")}>
                Personel
              </Nav.Link> */}
              <Nav.Link onClick={() => handleOnNavLinkClick("missions")}>
                Missions
              </Nav.Link>
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
                <Nav.Link onClick={() => handleOnNavLinkClick("login/")}>
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
