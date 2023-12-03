import { Card, CardContent } from "@mui/material";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { RiSendPlaneFill } from "react-icons/ri";
import IconButton from "../../../components/shared/IconButton";

export default function JobDetailEditableForm({
  fields,
  onChange,
  onSubmit,
  onCancel,
  isLoading,
}) {
  return (
    <Form className="d-grid gap-2 mt-2 mb-5">
      {fields.map((field) => (
        <CustomCard
          key={field.name}
          title={field.label}
          content={field.render(field, onChange)}
        />
      ))}

      <div className="d-flex gap-2 mb-4">
        <IconButton
          onClick={onSubmit}
          variant="success"
          icon={<RiSendPlaneFill size={16} />}
          isLoading={isLoading}
          spinnerVariant="light"
          label="Sauvegarder"
        />
        <Button onClick={onCancel} variant="outline-danger">
          Annuler
        </Button>
      </div>
    </Form>
  );
}

const CustomFormControl = ({ name, value, type, onChange, format }) => {
  const formattedValue = format ? format(value) : value;
  return (
    <Form.Control
      value={formattedValue}
      type={type}
      name={name}
      onChange={onChange}
    />
  );
};
// value.split("T")[0] || ""

const CustomCard = ({ title, content }) => {
  return (
    <Card>
      <CardContent>
        {title && <Form.Label>{title}</Form.Label>}
        {content}
      </CardContent>
    </Card>
  );
};
