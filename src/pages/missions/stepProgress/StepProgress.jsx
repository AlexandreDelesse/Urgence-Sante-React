import React, { useState } from "react";
import "./stepProgress.css";
import { Step, StepLabel, Button, Stepper } from "@mui/material";

export default function StepProgress() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const steps = ["En cours", "Début", "Dispo"];

  const goNextStep = () => {
    handleComplete();
    if (activeStep < steps.length) setActiveStep((old) => old + 1);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
  };

  return (
    <div>
      <Button onClick={goNextStep}>{steps[activeStep]}</Button>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((stepLabel, index) => (
          <Step key={stepLabel} completed={completed[index]}>
            <StepLabel>{stepLabel}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
