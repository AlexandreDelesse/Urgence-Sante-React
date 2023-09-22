import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import EditableLabel from "../../../components/shared/editableLabel/EditableLabel";
import EditableList from "../../../components/shared/editableList/EditableList";
import { nirValidator } from "../../../services/validator";

export default function MissionOtherInformations({ infosClient }) {
  const [formValues, setFormValues] = useState(infosClient);

  const onFormChanges = (name, value) => {
    if (name && value) setFormValues((old) => ({ ...old, [name]: value }));
  };

  const onSaveClick = () => {
    const values = formValues;
    if (!nirValidator(values.nir)) values.nir = "";

    console.log(values);
  };

  const onCheckBoxClick = (name) => {
    setFormValues((old) => ({ ...old, [name]: !old[name] }));
  };

  const onBirthDateChanges = (e) => {
    const formatted = new Date(e.target.value).toISOString();
    onFormChanges("ddn", formatted);
  };

  const onNirChanges = (e) => {
    onFormChanges("nir", e.target.value);
  };

  return (
    <Form>
      {/* Form body */}

      <Form.Group className="mt-3 mb-1">
        <Form.Label>Date de naissance</Form.Label>
        <Form.Control
          value={formValues.ddn ? formValues.ddn.split("T")[0] : ""}
          type="date"
          label="ddn"
          onChange={onBirthDateChanges}
        />
      </Form.Group>

      <div className="my-2">
        <Form.Label>n° sécurité sociale</Form.Label>
        <EditableLabel
          validator={nirValidator}
          onChange={(element) => onFormChanges("nir", element)}
          initialValue={formValues.nir}
          placeholder={"Ajouter un numéro de sécurité sociale"}
        />
      </div>

      <Form.Label>Emails</Form.Label>
      <EditableList
        buttonLabel="Ajouter une adresse email"
        initialList={infosClient.email}
        placeholder="Cliquez pour renseigner l'email"
        onChange={(value) => onFormChanges("emails", value)}
      />

      <Form.Label>Téléphones</Form.Label>
      <EditableList
        buttonLabel="Ajouter un téléphone"
        initialList={infosClient.phones}
        placeholder="Cliquez pour renseigner le téléphone"
        onChange={(value) => onFormChanges("phones", value)}
      />

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
            onChange={() => onCheckBoxClick("isPmtPresent")}
          />
        </Form.Group>
      )}

      <Form.Group className="mt-3 mb-1">
        <Form.Check
          checked={formValues.isSMUR}
          type="checkbox"
          label="Smur"
          onChange={() => onCheckBoxClick("isSMUR")}
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

      <div className="mt-3">
        <EditableLabel
          onChange={(element) => onFormChanges("comments", element)}
          initialValue={formValues.comments}
          placeholder={"Ajouter un commentaire"}
        />
      </div>

      {/* Bottom page */}
      <div className="d-flex gap-2 mt-3">
        <Button onClick={onSaveClick} variant="success">
          Sauvegarder
        </Button>
      </div>
    </Form>
  );
}
