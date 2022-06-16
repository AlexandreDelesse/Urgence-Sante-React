import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import UserContext from "../contexts/User.context";

export default function Home() {
  const { user } = useContext(UserContext);
  return (
    <Container>
      {user && <h1 className="text-center mt-5">Bonjour {user.name} !</h1>}
      <h2 className="text-center mt-5">Bienvenue sur la page principale</h2>
    </Container>
  );
}
