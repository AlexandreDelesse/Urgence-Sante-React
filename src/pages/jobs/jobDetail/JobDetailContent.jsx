import {
  CardContent,
  IconButton,
  Card as MuiCard,
  Typography,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Col, Row } from "react-bootstrap";

export default function JobDetailContent({ jobDetail }) {
  return (
    <div>
      <Typography className="my-3" variant="h5">
        {jobDetail.patient === "x" ? "Patient inconnu" : jobDetail.patient}
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
              <CustomTypography
                title="Prise en charge"
                content={jobDetail.schedule}
              />
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
