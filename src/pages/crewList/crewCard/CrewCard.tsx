import { Badge, Card, Col, Row } from 'react-bootstrap'
import { ICrew } from '../../../interfaces/ICrew'

export default function CrewCard({
  crew,
  onClick,
}: {
  crew: ICrew
  onClick: (crewId: string, crewCode: number) => void
}) {
  return (
    <div>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          {crew.label} <Badge>{crew.immat}</Badge>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Card.Subtitle>Membre 1</Card.Subtitle>
              <Card.Text onClick={() => onClick(crew.member1, crew.crewId)}>
                {crew.member1}
              </Card.Text>
            </Col>
            {crew.member2 && (
              <Col>
                <Card.Subtitle>Membre 2</Card.Subtitle>
                <Card.Text
                  onClick={() => onClick(crew.member2 || '', crew.crewId)}
                >
                  {crew.member2}
                </Card.Text>
              </Col>
            )}
          </Row>
          <Row className="mt-2">
            <Card.Subtitle>Code</Card.Subtitle>
            <Card.Text>{crew.crewId}</Card.Text>
          </Row>
          <Row className="mt-2">
            <Col>
              <Card.Subtitle>Debut</Card.Subtitle>
              <Card.Text>{new Date(crew.start).toLocaleString()}</Card.Text>
            </Col>
            {crew.end && (
              <Col>
                <Card.Subtitle>Fin</Card.Subtitle>
                <Card.Text>{new Date(crew.end).toLocaleString()}</Card.Text>
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>
    </div>
  )
}
