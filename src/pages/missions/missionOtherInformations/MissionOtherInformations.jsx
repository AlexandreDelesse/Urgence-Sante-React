import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import EditableLabel from "../../../components/shared/editableLabel/EditableLabel";
import EditableList from "../../../components/shared/editableList/EditableList";

export default function MissionOtherInformations({ infosClient }) {
  const [formValues, setFormValues] = useState(infosClient);
  console.log(infosClient);

  const onFormChanges = (name, value) => {
    console.log(name, value);
    if (name && value) setFormValues((old) => ({ ...old, [name]: value }));
  };

  const onSaveClick = () => {
    console.log(formValues);
  };

  const onCheckBoxClick = (name) => {
    setFormValues((old) => ({ ...old, [name]: !old[name] }));
  };

  const onBirthDateChanges = (e) => {
    const formatted = new Date(e.target.value).toISOString();
    onFormChanges("ddn", formatted);
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
