import React, { useState } from "react";
import OutlinedTextField from "./OutlinedTextField";
import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useEmailsFormViewModel from "../ViewModels/useEmailsFormViewModel";
import { IEmailFormViewModel } from "../../../../interfaces/IEmailFormViewModel";

interface EmailListFormViewProps {
  EmailFormViewModel: IEmailFormViewModel;
}

export default function EmailListFormView(props: EmailListFormViewProps) {
  const { EmailFormViewModel } = props;
  const { emails, deleteEmail, updateEmail, addEmptyEmail } =
    EmailFormViewModel;

  return (
    <div>
      {emails.map((email, index) => (
        <OutlinedTextField
          key={index}
          value={email}
          onChange={(e) => updateEmail(e.target.value, index)}
          label={`Email ${index + 1}`}
        />
      ))}
      <Button onClick={addEmptyEmail} startIcon={<AddCircleIcon />}>
        Ajouter un email
      </Button>
    </div>
  );
}
