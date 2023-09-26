import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BsCheck2 } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

export default function EditableLabel({
  initialValue,
  onChange,
  placeholder,
  validator,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(initialValue || "");

  const onCancelChanges = () => {
    setInputValue(initialValue);
    setIsEditing(false);
  };

  const onAcceptChanges = () => {
    if (validator && !validator(inputValue)) return;
    onChange(inputValue);
    setIsEditing(false);
  };

  const onEdit = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  if (isEditing)
    return (
      <Form.Group className="d-flex gap-2">
        <Form.Control
          isInvalid={validator ? !validator(inputValue) : false}
          isValid={validator ? validator(inputValue) : false}
          autoFocus
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          placeholder={placeholder}
        />
        <Button onClick={onCancelChanges} variant="outline-danger">
          <AiOutlineClose />
        </Button>
        {(validator && !validator(inputValue)) || (
          <Button onClick={onAcceptChanges} variant="primary">
            <BsCheck2 />
          </Button>
        )}
      </Form.Group>
    );
  else
    return (
      <div onClick={onEdit}>
        {inputValue || <span className="fw-light">{placeholder}</span>}
      </div>
    );
}