import React from 'react'
import { useEffect } from 'react'
import { Badge, Card, Col, Container, Row } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getMissionById } from '../../services/mission.service'
import AsyncDataComponent from '../shared/AsyncDataComponent'
import { IoMdReturnLeft } from 'react-icons/io'

export default function MissionDetail() {
  const params = useParams()

  const asyncMissionDetail = useQuery('missionDetail', () =>
    getMissionById(params.jobId),
  )

  return (
    <Container>
      <AsyncDataComponent
        withRefetchLoader
        onLoadingMessage="Chargement du détail.."
        data={asyncMissionDetail}
        onSuccess={({ data }) => (
          <div className="mt-3">
            <h2 className="mb-3">
              {data.patient}
              {data.isSerial && (
                <Badge className="ms-2">
                  Serie {data.isLastDay && '- Dernier jour'}
                </Badge>
              )}
            </h2>
            <Row>
              <Col>
                <p>
                  Prise en charge : <br />
                  <span className="fw-bold">{data.schedule}</span>
                </p>
              </Col>
              <Col>
                <p>
                  Transport : <br />
                  <span className="fw-bold">{data.transportMode}</span>
                </p>

                {data.appointment && (
                  <p>
                    Rdv à : <br />
                    <span className="fw-bold">{data.appointment}</span>
                  </p>
                )}
              </Col>
            </Row>

            <Card>
              <Card.Header>Départ</Card.Header>
              <Card.Body>{data.departure}</Card.Body>
            </Card>

            <Card className="mt-3">
              <Card.Header>Arrivée</Card.Header>
              <Card.Body>{data.arrival}</Card.Body>
            </Card>

            {data.comment && (
              <p>
                Commentaire : <br />
                <span className="fw-bold">{data.comment}</span>
              </p>
            )}
            {data.prescripteur && (
              <p>
                Prescripteur : <br />
                <span className="fw-bold">{data.comment}</span>
              </p>
            )}
          </div>
        )}
      />
    </Container>
  )
}
