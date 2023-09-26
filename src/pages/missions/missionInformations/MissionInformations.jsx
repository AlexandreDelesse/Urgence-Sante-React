import React from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import AsyncDataComponent from "../../../components/shared/AsyncDataComponent";
import StepProgress from "../stepProgress/StepProgress";
import { Box, Typography, Card as MuiCard, CardContent } from "@mui/material";

export default function MissionInformations({ asyncData }) {
  return (
    <AsyncDataComponent
      withRefetchLoader
      onLoadingMessage="Chargement du détail.."
      data={asyncData}
      onSuccess={({ data }) => (
        <div className="mt-3">
          <StepProgress />
          <Typography className="my-3" variant="h5">
            {data.patient}
          </Typography>

          {/* <h2 className="my-3">
            {data.patient}
            {data.isSerial && (
              <Badge className="ms-2">
                Serie {data.isLastDay && "- Dernier jour"}
              </Badge>
            )}
          </h2> */}
          <Row className="my-3">
            <Col xs={8}>
              <Typography variant="caption">Prise en charge</Typography>
              <Typography className="fw-bold" variant="body1" color="primary">
                {data.schedule}
              </Typography>
              {data.appointment && (
                <>
                  <Typography variant="caption">Rdv à :</Typography>
                  <Typography
                    className="fw-bold"
                    variant="body1"
                    color="primary"
                  >
                    {data.appointment}
                  </Typography>
                </>
              )}
            </Col>
            <Col>
              <Typography variant="caption">Transport</Typography>
              <Typography className="fw-bold" variant="body1" color="primary">
                {data.transportMode}
              </Typography>
            </Col>
          </Row>

          <MuiCard className="my-3">
            <CardContent>
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Départ
              </Typography>
              <Typography variant="body2" component="div">
                {data.departure}
              </Typography>
            </CardContent>
          </MuiCard>

          <MuiCard className="my-3">
            <CardContent>
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Arrivée
              </Typography>
              <Typography variant="body2" component="div">
                {data.arrival}
              </Typography>
            </CardContent>
          </MuiCard>

          {data.comment && (
            <>
              <Typography variant="caption">Commentaire :</Typography>
              <Typography className="fw-bold" variant="body1" color="primary">
                {data.comment}
              </Typography>
            </>
          )}
          {data.prescripteur && (
            <>
              <Typography variant="caption">Prescripteur :</Typography>
              <Typography className="fw-bold" variant="body1" color="primary">
                {data.prescripteur}
              </Typography>
            </>
          )}
        </div>
      )}
    />
  );
}
