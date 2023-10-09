import React from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CrewCard({ crew }) {
  const navigate = useNavigate();

  const navigateTologin = (crewId, code) => {
    if (!crewId || !code) return;
    navigate(`/login/${code}&${crewId}`);
  };

  return (
    <div>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          {crew.eQ_LIBELLE} <Badge>{crew.veH_IMMATRICULATION}</Badge>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Card.Subtitle>Membre 1</Card.Subtitle>
              <Card.Text
                onClick={() => navigateTologin(crew.peR_MEMBRE_1, crew.eQ_ID)}
              >
                {crew.peR_MEMBRE_1}
              </Card.Text>
            </Col>
            <Col>
              <Card.Subtitle>Membre 2</Card.Subtitle>
              <Card.Text
                onClick={() => navigateTologin(crew.peR_MEMBRE_2, crew.eQ_ID)}
              >
                {crew.peR_MEMBRE_2}
              </Card.Text>
            </Col>
          </Row>
          <Row className="mt-2">
            <Card.Subtitle>Code</Card.Subtitle>
            <Card.Text>{crew.eQ_ID}</Card.Text>
          </Row>
          <Row className="mt-2">
            <Col>
              <Card.Subtitle>Debut</Card.Subtitle>
              <Card.Text>{new Date(crew.eQ_DEBUT).toLocaleString()}</Card.Text>
            </Col>
            <Col>
              <Card.Subtitle>Fin</Card.Subtitle>
              <Card.Text>{new Date(crew.eQ_FIN).toLocaleString()}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
