import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import EditableLabel from "../../../components/shared/editableLabel/EditableLabel";
import EditableList from "../../../components/shared/editableList/EditableList";

export default function MissionOtherInformations({ infosClient }) {
  const [formValues, setFormValues] = useState(infosClient);

  const onFormChanges = (value) => {
    console.log(value);
  };

  const onSaveClick = () => {
    console.log(formValues);
  };

  return (
    <Form>
      <Form.Label>Emails</Form.Label>
      <EditableList
        buttonLabel="Ajouter une adresse email"
        initialList={infosClient.email}
        placeholder="Cliquez pour renseigner l'email"
        onChange={onFormChanges}
      />

      <Form.Label>Téléphones</Form.Label>
      <EditableList
        buttonLabel="Ajouter un téléphone"
        initialList={infosClient.phones}
        placeholder="Cliquez pour renseigner le téléphone"
      />

      <Form.Group className="mt-3 mb-1">
        <Form.Label>Type de contrat</Form.Label>
        <Form.Select>
          {infosClient.contractType.map((contrat) => (
            <option key={contrat} value={contrat.replace(" ", "_")}>
              {contrat}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      {/* <Form.Group className="mt-3 mb-1">
        <Form.Check
          checked={infosClient.isPmtPresent}
          type="checkbox"
          label="J'ai une préscription médicale"
        />
      </Form.Group> */}
      <Button onClick={onSaveClick} className="mt-3" variant="success">
        Sauvegarder
      </Button>
    </Form>
  );
}
