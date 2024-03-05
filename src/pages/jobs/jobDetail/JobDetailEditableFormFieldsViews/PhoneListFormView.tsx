import React from "react";
import { IPhoneFormViewModel } from "../../../../interfaces/IPhonesFormViewModel";
import OutlinedTextField from "./OutlinedTextField";
import { Box, Button, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

interface PhoneListFormViewProps {
  PhoneFormViewModel: IPhoneFormViewModel;
}

export default function PhoneListFormView(props: PhoneListFormViewProps) {
  const { PhoneFormViewModel } = props;
  const {
    phones,
    addEmptyPhone,
    deletePhone,
    updatePhone,
    hasEmptyPhone,
    getError,
  } = PhoneFormViewModel;

  return (
    <div>
      {phones.map((phone, index) => (
        <Box key={index} sx={{ display: "flex" }}>
          <OutlinedTextField
            value={phone}
            onChange={(e) => updatePhone(e.target.value, index)}
            label={`Téléphone ${index + 1}`}
            error={!!getError(index)}
            helperText={getError(index)?.msg}
            inputMode="tel"
          />
          <IconButton
            onClick={() => deletePhone(index)}
            sx={{ alignSelf: "baseline", mt: "8px" }}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      ))}
      {!hasEmptyPhone && (
        <Button onClick={addEmptyPhone} startIcon={<AddCircleIcon />}>
          Ajouter un téléphone
        </Button>
      )}
    </div>
  );
}
