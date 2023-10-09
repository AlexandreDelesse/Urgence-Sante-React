import React, { useContext, useState } from "react";
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/User.context";
import { FiLogOut } from "react-icons/fi";
import packageJson from "../../package.json";

export default function MainNavbar() {
  const navigate = useNavigate();
  const { user, setUser, hasLogged } = useContext(UserContext);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleOnNavLinkClick = (link, replace = false) => {
    navigate(link, { replace: replace });
    setShowOffcanvas(false);
  };

  return (
    <Navbar
      style={{ position: "sticky", top: 0 }}
      fixed="top"
      bg="dark"
      variant="dark"
      expand="lg"
    >
      <Container fluid>
        <Navbar.Brand onClick={() => handleOnNavLinkClick("/")}>
          <img
            className="me-3"
            style={{ height: "32px" }}
            src={require("../assets/logo-us.png")}
            alt="Logo urgence sante"
          />
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
              <Nav.Link onClick={() => handleOnNavLinkClick("/")}>
                Missions
              </Nav.Link>
              {hasLogged ? (
                <Nav.Link onClick={() => handleOnNavLinkClick("/regul", true)}>
                  Régulation
                </Nav.Link>
              ) : null}
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
            <p className="ms-3">version {packageJson.version}</p>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
