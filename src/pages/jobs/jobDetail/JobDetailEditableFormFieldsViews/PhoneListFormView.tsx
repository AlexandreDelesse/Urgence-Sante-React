import React from "react";
import { IPhoneFormViewModel } from "../../../../interfaces/IPhonesFormViewModel";
import OutlinedTextField from "./OutlinedTextField";
import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface PhoneListFormViewProps {
  PhoneFormViewModel: IPhoneFormViewModel;
}

export default function PhoneListFormView(props: PhoneListFormViewProps) {
  const { PhoneFormViewModel } = props;
  const { phones, addEmptyPhone, deletePhone, updatePhone } =
    PhoneFormViewModel;

  return (
    <div>
      {phones.map((phone, index) => (
        <OutlinedTextField
          key={index}
          value={phone}
          onChange={(e) => updatePhone(e.target.value, index)}
          label={`Téléphone ${index + 1}`}
        />
      ))}
      <Button onClick={addEmptyPhone} startIcon={<AddCircleIcon />}>
        Ajouter un téléphone
      </Button>
    </div>
  );
}
