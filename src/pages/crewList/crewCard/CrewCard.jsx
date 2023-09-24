import React from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";

export default function CrewCard({ crew }) {
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
              <Card.Text>{crew.peR_MEMBRE_1}</Card.Text>
            </Col>
            <Col>
              <Card.Subtitle>Membre 2</Card.Subtitle>
              <Card.Text>{crew.peR_MEMBRE_2}</Card.Text>
            </Col>
          </Row>
          <Row className="mt-2">
            <Card.Subtitle>Code</Card.Subtitle>
            <Card.Text>{crew.eQ_ID}</Card.Text>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
