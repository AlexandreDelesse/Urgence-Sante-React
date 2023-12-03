import {
  CardContent,
  IconButton,
  Card as MuiCard,
  Typography,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Col, Row } from "react-bootstrap";

export default function JobDetailContent({ jobDetail, toggleForm }) {
  return (
    <div>
      <Typography className="my-3" variant="h5">
        {jobDetail.patient.completeName.trim() === "x"
          ? "Patient inconnu"
          : jobDetail.patient.completeName}
        {jobDetail.patient.completeName.trim() === "x" && (
          <IconButton onClick={toggleForm}>
            <EditIcon />
          </IconButton>
        )}
      </Typography>
      <MuiCard>
        <CardContent>
          <Row>
            <Col xs={8}>
              <CustomTypography
                title="Prise en charge"
                content={jobDetail.schedule}
              />
            </Col>
            <Col>
              <CustomTypography
                title="Transport"
                content={jobDetail.transportMode}
              />
            </Col>
          </Row>
        </CardContent>
      </MuiCard>

      <CustomCard title="Départ" content={jobDetail.departure} />

      <CustomCard title="Arrivée" content={jobDetail.arrival} />

      {jobDetail.comments && (
        <CustomTypography title="Commentaire" content={jobDetail.comments} />
      )}
      {jobDetail.prescripteur && (
        <CustomTypography
          title="Prescripteur"
          content={jobDetail.prescripteur}
        />
      )}
    </div>
  );
}

const CustomTypography = ({ title, content }) => {
  return (
    <>
      <Typography variant="caption">{title}</Typography>
      <Typography className="fw-bold" variant="body1" color="primary">
        {content}
      </Typography>
    </>
  );
};

const CustomCard = ({ title, content }) => {
  return (
    <MuiCard className="my-2">
      <CardContent>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" component="div">
          {content}
        </Typography>
      </CardContent>
    </MuiCard>
  );
};
