import React, { useState } from "react";
import "./stepProgress.css";
import { Step, StepLabel, Button, Stepper, Typography } from "@mui/material";

export default function StepProgress() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [steps, setSteps] = useState([
    { label: "En route", time: null },
    { label: "En charge", time: null },
    { label: "Dispo", time: null },
  ]);

  const goNextStep = () => {
    handleComplete();
    if (activeStep < steps.length) setActiveStep((old) => old + 1);
  };

  const handleComplete = () => {
    const newSteps = steps.map((step, index) =>
      index === activeStep
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
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
  };

  return (
    <div>
      <Button onClick={goNextStep}>
        {steps[activeStep] ? steps[activeStep].label : ""}
      </Button>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={step.label} completed={completed[index]}>
            <StepLabel>
              {step.label}
              <br />
              <Typography variant="caption">{step.time}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
