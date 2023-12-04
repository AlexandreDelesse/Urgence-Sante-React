import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import AsyncDataComponent from "../../../../components/shared/AsyncDataComponent";
import StepProgress from "./stepProgress/StepProgress";
import {
  Typography,
  Card as MuiCard,
  CardContent,
  IconButton,
} from "@mui/material";
import CreateClientForm from "./createClientForm/CreateClientForm";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation } from "react-query";
import { createNewPatient } from "../../../../services/patient.service";

export default function MissionInformations({
  asyncData,
  jobId,
  asyncMissionStatus,
}) {
  const [showOffcanvas, setShowOffcanvas] = useState(true);

  const createPatientMutation = useMutation((patient) => createNewPatient);

  const createPatientHandler = (patient) => {
    createPatientMutation.mutate(patient)
  }

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  return (
    <AsyncDataComponent
      withRefetchLoader
      onLoadingMessage="Chargement du détail.."
      data={asyncData}
      onSuccess={({ data }) => (
        <div className="mt-3 mb-5">
          <Typography className="my-3" variant="h5">
            {data.patient === "x"
              ? "Patient inconnu"
              : data.patient}
            {/* <Button onClick={toggleOffcanvas} startIcon={<AddIcon />}>
              Nouveau client
            </Button> */}
            {data.patient.completeName === "x" && (
              <IconButton onClick={toggleOffcanvas} color="primary">
                <EditIcon />
              </IconButton>
            )}
          </Typography>

          {/* <h2 className="my-3">
            {data.patient}
            {data.isSerial && (
              <Badge className="ms-2">
                Serie {data.isLastDay && "- Dernier jour"}
              </Badge>
            )}
          </h2> */}
          <MuiCard>
            <CardContent>
              <Row>
                <Col xs={8}>
                  <Typography variant="caption">Prise en charge</Typography>
                  <Typography
                    className="fw-bold"
                    variant="body1"
                    color="primary"
                  >
                    {data.schedule}
                  </Typography>
                  {/* {data.appointment && (
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
                  )} */}
                </Col>
                <Col>
                  <Typography variant="caption">Transport</Typography>
                  <Typography
                    className="fw-bold"
                    variant="body1"
                    color="primary"
                  >
                    {data.transportMode}
                  </Typography>
                </Col>
              </Row>
            </CardContent>
          </MuiCard>

          <MuiCard className="my-2">
            <CardContent>
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Départ
              </Typography>
              <Typography variant="body2" component="div">
                {data.departure}
              </Typography>
            </CardContent>
          </MuiCard>

          <MuiCard className="my-2">
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
          <AsyncDataComponent
            withRefetchLoader
            data={asyncMissionStatus}
            onSuccess={({ data }) => (
              <StepProgress
                jobId={jobId}
                initialStep={{
                  go: data.go ? new Date(data.go) : null,
                  onSite: data.onSite ? new Date(data.onSite) : null,
                  available: data.available ? new Date(data.available) : null,
                }}
              />
            )}
          />

          <CreateClientForm show={showOffcanvas} toggle={toggleOffcanvas} onSubmit={createPatientHandler} />
        </div>
      )}
    />
  );
}
