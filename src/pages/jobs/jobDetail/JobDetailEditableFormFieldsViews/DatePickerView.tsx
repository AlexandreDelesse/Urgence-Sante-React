import { TextField } from "@mui/material";
import React from "react";
import { IDatePickerViewModel } from "../../../../interfaces/IDatePickerViewModel";
import OutlinedTextField from "./OutlinedTextField";

interface DatePickerViewProps {
  DatePickerViewModel: IDatePickerViewModel;
}

export default function DatePickerView(props: DatePickerViewProps) {
  const { DatePickerViewModel } = props;
  const { updateDate, ddn } = DatePickerViewModel;
  return (
    <OutlinedTextField
      label="Date de naissance"
      type="date"
      onChange={updateDate}
      value={ddn}
      inputLabelprops={{ shrink: true }}
    />
  );
}
