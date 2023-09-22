import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function EditableLabel({ initialValue, onChange, placeholder }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(initialValue || "");

  const inputRef = useRef(null);

  const onCancelChanges = () => {
    setInputValue(initialValue);
    setIsEditing(false);
  };

  const onAcceptChanges = () => {
    onChange(inputValue);
    setIsEditing(false);
  };

  const onEdit = () => {
    setIsEditing(true);
  };

  if (isEditing)
    return (
      <Form.Group className="d-flex gap-2">
        <Form.Control
          autoFocus
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
      <div onClick={onEdit}>
        {inputValue || <span className="fw-light">{placeholder}</span>}
      </div>
    );
}
