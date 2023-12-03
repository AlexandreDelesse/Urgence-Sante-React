import { Card, CardContent } from "@mui/material";
import React from "react";
import { Form } from "react-bootstrap";

export default function JobDetailEditableForm({ fields, onChange }) {
  return (
    <Form className="d-grid gap-2 mt-2 mb-5">
      {fields.map((field) => (
        <CustomCard
          key={field.name}
          title={field.label}
          content={field.render(field, onChange)}
        />
      ))}
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
