import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function EditableLabel({ initialValue, onChange, placeholder }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(initialValue || "");

  const onCancelChanges = () => {
    setInputValue(initialValue);
    setIsEditing(false);
  };

  const onAcceptChanges = () => {
    onChange(inputValue);
    setIsEditing(false);
  };

  if (isEditing)
    return (
      <Form.Group className="d-flex gap-2">
        <Form.Control
          onChange={(e) => setInputValue(e.target.value)}
          size="sm"
          value={inputValue}
          placeholder={placeholder}
        />
        <Button onClick={onCancelChanges} size="sm" variant="outline-danger">
          Nok
        </Button>
        <Button onClick={onAcceptChanges} size="sm" variant="primary">
          Ok
        </Button>
      </Form.Group>
    );
  else
    return (
      <div onClick={() => setIsEditing(true)}>
        {inputValue || placeholder}
      </div>
    );
}
