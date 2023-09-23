import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import EditableLabel from "../../../components/shared/editableLabel/EditableLabel";
import EditableList from "../../../components/shared/editableList/EditableList";
import { nirValidator } from "../../../services/validator";
import { useQueryClient } from "react-query";
import { RiSendPlaneFill } from "react-icons/ri";
import IconButton from "../../../components/shared/IconButton";
import { patchJobDetailEditable } from "../../../services/mission.service";

export default function MissionOtherInformations({ infosClient }) {
  const [formValues, setFormValues] = useState(infosClient);
  const [formHasChanged, setFormHasChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const queryClient = useQueryClient();

  const onFormChanges = (name, value) => {
    if (name) {
      setFormValues((old) => ({ ...old, [name]: value }));
      setFormHasChanged(true);
    }
  };

  const onCloseError = () => {
    setErrorMsg("");
  };

  const onSaveClick = async () => {
    const values = formValues;
    if (typeof formValues.contractType != "string")
      values.contractType = formValues.contractType[0];
    if (!nirValidator(values.nir)) values.nir = "";
    setIsLoading(true);
    try {
      await patchJobDetailEditable(values);
      queryClient.invalidateQueries("jobDetailEdiable");
    } catch (error) {
      setIsLoading(false);
      setErrorMsg(error.message);
    }
    setIsLoading(false);

    setFormHasChanged(false);
  };

  const onAbortClick = () => {
    setFormValues({ ...infosClient });
    setFormHasChanged(false);
  };

  const onCheckBoxClick = (name, value) => {
    onFormChanges(name, !formValues[name]);
  };

  const onBirthDateChanges = (e) => {
    const formatted = new Date(e.target.value).toISOString();
    onFormChanges("ddn", formatted);
  };

  return (
    <Form>
      {/* Form body */}
      <Row className="my-3 bg-light p-2 rounded">
        <Col>
          <Form.Group>
            <Form.Label>Date de naissance</Form.Label>
            <Form.Control
              value={formValues.ddn ? formValues.ddn.split("T")[0] : ""}
              type="date"
              label="ddn"
              onChange={onBirthDateChanges}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="my-3 bg-light p-2 rounded">
        <Col>
          <div>
            <Form.Label>n° sécurité sociale</Form.Label>
            <EditableLabel
              validator={nirValidator}
              onChange={(element) => onFormChanges("nir", element)}
              initialValue={formValues.nir}
              placeholder={"Entrez NIR"}
            />
          </div>
        </Col>
      </Row>

      <Row className="my-3 bg-light p-2 rounded">
        <Form.Label>Emails</Form.Label>
        <EditableList
          buttonLabel="Ajouter une adresse email"
          initialList={formValues.emails}
          placeholder="Cliquez pour renseigner l'email"
          onChange={(value) => onFormChanges("emails", value)}
        />
      </Row>

      <Row className="my-3 bg-light p-2 rounded">
        <Form.Label>Téléphones</Form.Label>
        <EditableList
          buttonLabel="Ajouter un téléphone"
          initialList={formValues.phones}
          placeholder="Cliquez pour renseigner le téléphone"
          onChange={(value) => onFormChanges("phones", value)}
        />
      </Row>

      <Row className="my-3 bg-light p-2 rounded">
        <Form.Group className="mt-3 mb-1">
          <Form.Label>Type de contrat</Form.Label>
          <Form.Select
            onChange={(e) => onFormChanges("contractType", e.target.value)}
          >
            {infosClient.contractType.map((contrat) => (
              <option key={contrat} value={contrat.replace(" ", "_")}>
                {contrat}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {formValues.isSMUR || (
          <Form.Group className="mt-3 mb-1">
            <Form.Check
              checked={formValues.isPmtPresent}
              type="checkbox"
              label="J'ai une préscription médicale"
              onChange={() =>
                onFormChanges("isPmtPresent", !formValues.isPmtPresent)
              }
            />
          </Form.Group>
        )}

        <Form.Group className="mt-3 mb-1">
          <Form.Check
            checked={formValues.isSMUR}
            type="checkbox"
            label="Smur"
            onChange={() => onFormChanges("isSMUR", !formValues.isSMUR)}
          />
        </Form.Group>

        {formValues.isSMUR && (
          <div className="d-flex gap-2">
            Pour la ville de
            <span className="text-uppercase fw-bold">
              <EditableLabel
                onChange={(element) => onFormChanges("smurCity", element)}
                initialValue={formValues.smurCity}
                placeholder={"Renseigner la ville"}
              />
            </span>
          </div>
        )}
      </Row>

      <div className="mt-3">
        <EditableLabel
          onChange={(element) => onFormChanges("comments", element)}
          initialValue={formValues.comments}
          placeholder={"Ajouter un commentaire"}
        />
      </div>

      {/* Bottom page */}
      <div className="d-flex gap-2 my-3">
        <IconButton
          onClick={onSaveClick}
          variant="success"
          icon={<RiSendPlaneFill size={16} />}
          isLoading={isLoading}
          spinnerVariant="light"
          label="Sauvegarder"
          disabled={!formHasChanged}
        />
        <Button
          disabled={!formHasChanged}
          onClick={onAbortClick}
          variant="outline-danger"
        >
          Annuler
        </Button>
      </div>
      {errorMsg && (
        <Alert className="my-2" onClose={onCloseError} dismissible>
          {errorMsg}
        </Alert>
      )}
    </Form>
  );
}
