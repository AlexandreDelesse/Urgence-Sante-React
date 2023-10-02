import React, { useState } from "react";
import "./stepProgress.css";
import {
  Step,
  StepLabel,
  Button,
  Stepper,
  Typography,
  StepButton,
  Modal,
  Box,
  Input,
  Card,
  CardContent,
} from "@mui/material";
import { FormControl } from "react-bootstrap";

export default function StepProgress() {
  const [activeStep, setActiveStep] = useState(-1);
  const [completed, setCompleted] = useState({});
  const [steps, setSteps] = useState([
    { label: "En route", time: null },
    { label: "En charge", time: null },
    { label: "Dispo", time: null },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStep, setEditingStep] = useState(null);
  const [editingStepValue, setEditingStepValue] = useState(null);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const goNextStep = () => {
    handleComplete();
    if (activeStep < steps.length) setActiveStep((old) => old + 1);
  };

  const updateStep = (stepindex, value) => {
    setSteps((old) =>
      old.map((step, index) =>
        stepindex === index ? { ...step, time: value } : step
      )
    );
  };

  const handleComplete = () => {
    const newSteps = steps.map((step, index) =>
      index === activeStep + 1
        ? {
            ...step,
            time: new Date().toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }
        : step
    );
    setSteps(newSteps);
    const newCompleted = completed;
    newCompleted[activeStep + 1] = true;
    setCompleted(newCompleted);
  };

  const toggleModalopen = () => {
    setModalOpen(!modalOpen);
  };

  const handleOnEditTime = (index) => {
    setEditingStep(index);
    setEditingStepValue(steps[index].time);
    toggleModalopen();
  };

  const updateEditingStep = (e) => setEditingStepValue(e.target.value);

  const onValidateUpdateStep = () => {
    updateStep(editingStep, editingStepValue);
    toggleModalopen();
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step, index) => (
              <Step key={step.label} completed={completed[index]}>
                <StepButton onClick={() => handleOnEditTime(index)}>
                  {step.label}
                  <br />
                  <Typography variant="caption">{step.time}</Typography>
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>
      <div className="d-flex justify-content-end">
        <Button className="my-1" onClick={goNextStep}>
          {steps[activeStep + 1] ? steps[activeStep + 1].label : ""}
        </Button>
      </div>

      {editingStep >= 0 && (
        <Modal open={modalOpen} onClose={toggleModalopen}>
          <Box sx={style}>
            <Typography variant="h5">Mettre à jour l'heure</Typography>
            <Input
              onChange={updateEditingStep}
              value={editingStepValue}
              type="time"
            />
            <div className="d-flex gap-2 my-3">
              <Button
                onClick={onValidateUpdateStep}
                variant="contained"
                color="success"
              >
                Valider
              </Button>
              <Button
                onClick={toggleModalopen}
                color="secondary"
                variant="outlined"
              >
                Annuler
              </Button>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
}
