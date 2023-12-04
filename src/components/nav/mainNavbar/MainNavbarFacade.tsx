import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../contexts/User.context";
import MainNavbar from "./MainNavbar";
import { ILink } from "../../../interfaces/link/ILink";

export default function MainNavbarFacade() {
  const navigate = useNavigate();
  const { hasLogged } = useContext(UserContext);
  const [showSidePanel, setShow] = useState(false);

  const handleOnNavLinkClick = (link: string, replace: boolean = false) => {
    navigate(link, { replace });
    toggleSidePanel();
  };

  const toggleSidePanel = () => setShow((old) => !old);

  const links: ILink[] = [
    { name: "Missions", path: "jobs" },
    { name: "Login", path: "login" },
    { name: "regulation", path: "regul", isProtected: true },
  ];

  const filteredLinks: ILink[] = hasLogged
    ? links
    : links.filter((link) => !link.isProtected);

  return (
    <MainNavbar
      showSidePanel={showSidePanel}
      toggleSidePanel={toggleSidePanel}
      navLinks={filteredLinks}
      onNavLinkClick={handleOnNavLinkClick}
    />
  );
}
