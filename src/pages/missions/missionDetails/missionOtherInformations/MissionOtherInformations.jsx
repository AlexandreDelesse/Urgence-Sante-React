import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import EditableLabel from "../../../../components/shared/editableLabel/EditableLabel";
import EditableList from "../../../../components/shared/editableList/EditableList";
import { nirValidator } from "../../../../services/validator";
import { useQueryClient } from "react-query";
import { RiSendPlaneFill } from "react-icons/ri";
import IconButton from "../../../../components/shared/IconButton";
import { patchJobDetailEditable } from "../../../../services/mission.service";
import { Card, CardContent } from "@mui/material";
import ContractTypeSelector from "./contractTypeSelector/ContractTypeSelector";

export default function MissionOtherInformations({ infosClient }) {
  const [formValues, setFormValues] = useState(infosClient);
  const [formHasChanged, setFormHasChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const queryClient = useQueryClient();

  const onFormChanges = (name, value) => {
    if (name) {
      console.log("chech");
      setFormValues((old) => ({ ...old, [name]: value }));
      setFormHasChanged(true);
    }
  };

  const onCloseError = () => {
    setErrorMsg("");
  };

  const onSaveClick = async () => {
    const values = formValues;
    if (!nirValidator(values.nir)) values.nir = "";
    const { id, selectedValue } = values.selectedContractType || {};
    values.selectedContractType = id
      ? {
          id,
          selectedValue,
          hasSelectedValue: !!selectedValue,
        }
      : null;
    values.contractTypes = undefined;
    console.log(values);
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
    <Form className="d-grid gap-2 mt-2 mb-5">
      {/* Form body */}
      <Card>
        <CardContent>
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
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <ContractTypeSelector
            formValues={formValues}
            contractTypeList={infosClient.contractTypes}
            onFormChanges={onFormChanges}
            initialValue={infosClient.selectedContractType}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div>
            <Form.Label>n° sécurité sociale</Form.Label>
            <EditableLabel
              validator={nirValidator}
              onChange={(element) => onFormChanges("nir", element)}
              initialValue={formValues.nir}
              placeholder={"Entrez NIR"}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Form.Label>Emails</Form.Label>
          <EditableList
            buttonLabel="Ajouter une adresse email"
            initialList={formValues.emails}
            placeholder="Cliquez pour renseigner l'email"
            onChange={(value) => onFormChanges("emails", value)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Form.Label>Téléphones</Form.Label>
          <EditableList
            buttonLabel="Ajouter un téléphone"
            initialList={formValues.phones}
            placeholder="Cliquez pour renseigner le téléphone"
            onChange={(value) => onFormChanges("phones", value)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <EditableLabel
            onChange={(element) => onFormChanges("comments", element)}
            initialValue={formValues.comments}
            placeholder={"Ajouter un commentaire"}
          />
        </CardContent>
      </Card>

      {/* Bottom page */}
      <div className="d-flex gap-2 mb-4">
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
