import React, { useState } from "react";
import OutlinedTextField from "./OutlinedTextField";
import { Box, Button, FormControl, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useEmailsFormViewModel from "../ViewModels/useEmailsFormViewModel";
import { IEmailFormViewModel } from "../../../../interfaces/IEmailFormViewModel";
import DeleteIcon from "@mui/icons-material/Delete";

interface EmailListFormViewProps {
  EmailFormViewModel: IEmailFormViewModel;
}

export default function EmailListFormView(props: EmailListFormViewProps) {
  const { EmailFormViewModel } = props;
  const {
    emails,
    deleteEmail,
    updateEmail,
    addEmptyEmail,
    hasEmptyEmail,
    getError,
  } = EmailFormViewModel;

  return (
    <div>
      {emails.map((email, index) => (
        <Box key={index} sx={{ display: "flex" }}>
          <OutlinedTextField
            value={email}
            onChange={(e) => updateEmail(e.target.value, index)}
            label={`Email ${index + 1}`}
            error={!!getError(index)}
            helperText={getError(index)?.msg}
            inputMode="email"
          />
          <IconButton
            onClick={() => deleteEmail(index)}
            sx={{ alignSelf: "baseline", mt: "8px" }}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      ))}
      {!hasEmptyEmail && (
        <Button onClick={addEmptyEmail} startIcon={<AddCircleIcon />}>
          Ajouter un email
        </Button>
      )}
    </div>
  );
}
