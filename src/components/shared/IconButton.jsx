import { Button } from "react-bootstrap";
import React from "react";
import { Spinner } from "react-bootstrap";

export default function IconButton({
  icon,
  label,
  isLoading,
  size,
  onClick,
  variant,
  spinnerVariant,
}) {
  return (
    <Button
      size={size}
      variant={variant}
      className="d-flex align-items-center gap-2"
      onClick={onClick}
    >
      {isLoading ? (
        <Spinner
          size="sm"
          animation="border"
          variant={spinnerVariant || "warning"}
        />
      ) : (
        icon
      )}
      <span>{label}</span>
    </Button>
  );
}
