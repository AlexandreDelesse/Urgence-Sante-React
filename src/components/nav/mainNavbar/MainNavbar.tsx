import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import packageJson from "../../../../package.json";
import { ILink } from "../../../interfaces/link/ILink";

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
  return (
    <Navbar
      style={{ position: "sticky", top: 0 }}
      fixed="top"
      bg="dark"
      variant="dark"
      expand="lg"
    >
      <Container fluid>
        <Navbar.Brand onClick={() => onNavLinkClick("/")}>
          <img
            className="me-3"
            style={{ height: "32px" }}
            src={require("../../../assets/logo-us.png")}
            alt="Logo urgence sante"
          />
          Urgence Sante
        </Navbar.Brand>
        <Navbar.Toggle
          onClick={toggleSidePanel}
          aria-controls="basic-navbar-nav"
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
            <Nav className="me-auto">
              {navLinks.map((link) => (
                <Nav.Link onClick={() => onNavLinkClick(link.path)}>
                  {link.name}
                </Nav.Link>
              ))}
            </Nav>
            <div className="my-5">version {packageJson.version}</div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
