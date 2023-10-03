import React, { useEffect, useState } from "react";
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
import { updateMissionStatus } from "../../../../../services/mission.service";
import { useQueryClient } from "react-query";

export default function StepProgress({ jobId, initialStep }) {
  const getInitialStep = () => {
    const initialStep = Object.keys(step).findIndex(
      (key) => step[key] === null
    );
    return initialStep === -1 ? 3 : initialStep;
  };

  const [step, setStep] = useState(
    initialStep || { go: null, onSite: null, available: null }
  );
  const [activeStep, setActiveStep] = useState(getInitialStep() || 0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStep, setEditingStep] = useState(null);
  const [editingStepValue, setEditingStepValue] = useState(null);

  const queryClient = useQueryClient();

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

  const updateStep = (stepKey, value) => {
    const [h, m, s] = value.split(":");
    const newStepDate = new Date(step[stepKey]);
    newStepDate.setHours(h);
    newStepDate.setMinutes(m);
    if (s) newStepDate.setSeconds(s);
    setStep((old) => ({ ...old, [stepKey]: newStepDate }));
    updateStatus(stepKey, newStepDate);
  };

  const toggleModalopen = () => {
    setModalOpen(!modalOpen);
  };

  const onStepClick = (key) => {
    if (!step[key]) return;
    setEditingStep(key);
    setEditingStepValue(step[key].toLocaleTimeString());
    toggleModalopen();
  };

  const updateEditingStep = (e) => setEditingStepValue(e.target.value);

  const onValidateUpdateStep = () => {
    updateStep(editingStep, editingStepValue);
    toggleModalopen();
  };

  const updateStatus = async (stepKey, value) => {
    await updateMissionStatus({
      jobId,
      step: { ...step, [stepKey]: value },
    });
    queryClient.invalidateQueries("missionStatus");
  };

  const completeStep = () => {
    const activeKey = Object.keys(step).find(
      (key, index) => index === activeStep
    );

    const newActiveStepValue = new Date();
    setStep((old) => ({ ...old, [activeKey]: newActiveStepValue }));
    updateStatus(activeKey, newActiveStepValue);
    setActiveStep((old) => old + 1);
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            {Object.keys(step).map((key) => (
              <Step key={key}>
                <StepButton onClick={() => onStepClick(key)}>
                  {key}
                  <br />
                  <Typography variant="caption">
                    {step[key] ? step[key].toLocaleTimeString() : null}
                  </Typography>
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>
      {activeStep < 3 && (
        <div className="d-flex justify-content-end">
          <Button className="my-1" onClick={completeStep}>
            {Object.keys(step)[activeStep]}
          </Button>
        </div>
      )}

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
    </div>
  );
}
