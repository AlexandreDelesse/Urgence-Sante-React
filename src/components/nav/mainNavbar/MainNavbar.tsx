import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import { ILink } from "../../../interfaces/link/ILink";
import { useLocation } from "react-router-dom";
import BackButton from "../../shared/BackButton";
import VersionDisplayerView from "../../VersionDisplayer/VersionDisplayerView";

export default function MainNavbar({
  navLinks,
  onNavLinkClick,
  showSidePanel,
  toggleSidePanel,
}: {
  showSidePanel: boolean;
  toggleSidePanel: () => void;
  navLinks: ILink[];
  onNavLinkClick: (link: string) => void;
}) {
  const location = useLocation();
  const isMainPage = location.pathname === "/jobs";
  return (
    <Navbar
      style={{ position: "fixed", top: 0 }}
      fixed="top"
      bg="light"
      variant="light"
      expand="lg"
    >
      <Container fluid>
        {isMainPage ? (
          <Navbar.Brand onClick={() => onNavLinkClick("/")}>
            <img
              className="me-3"
              style={{ height: "32px" }}
              src={require("../../../assets/logo-us.png")}
              alt="Logo urgence sante"
            />
            Urgence Sante
          </Navbar.Brand>
        ) : (
          <BackButton />
        )}
        <Navbar.Toggle
          onClick={toggleSidePanel}
          aria-controls="basic-navbar-nav"
          className="border-0"
        />
        <Navbar.Offcanvas
          show={showSidePanel}
          onHide={toggleSidePanel}
          id="basic-navbar-nav"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="me-auto align-items-center">
              {navLinks.map((link) => (
                <Nav.Link
                  key={link.name}
                  onClick={() => onNavLinkClick(link.path)}
                >
                  {link.name}
                </Nav.Link>
              ))}
            </Nav>
          </Offcanvas.Body>
          <VersionDisplayerView />
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
