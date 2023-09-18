import React from "react";
import { Form, Placeholder } from "react-bootstrap";
import EditableLabel from "../../../components/shared/editableLabel/EditableLabel";

export default function MissionOtherInformations({ infosClient }) {
  return (
    <Form>
      <Form.Group className="mt-3 mb-1">
        <Form.Label>Email</Form.Label>
        <EditableLabel
          initialValue={infosClient.email}
          onChange={(el) => console.log(el)}
          placeholder="un texte"
        />
      </Form.Group>
      <Form.Group className="mt-3 mb-1">
        <Form.Label>Téléphones</Form.Label>
        {infosClient.phones.map((phone) => (
          <EditableLabel
            key={phone}
            initialValue={phone}
            onChange={(el) => console.log(el)}
            placeholder="un texte"
          />
        ))}
      </Form.Group>
      <Form.Group className="mt-3 mb-1">
        <Form.Label>Type de contrat</Form.Label>
        <Form.Select>
          {infosClient.contrats.map((contrat) => (
            <option key={contrat} value={contrat.replace(" ", "_")}>
              {contrat}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mt-3 mb-1">
        <Form.Check type="checkbox" label="J'ai une préscription médicale" />
      </Form.Group>
    </Form>
  );
}
