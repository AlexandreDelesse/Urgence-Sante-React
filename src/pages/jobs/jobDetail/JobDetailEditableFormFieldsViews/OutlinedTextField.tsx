import { TextField } from "@mui/material";

interface OutlinedTextFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index?: number) => any;
  label: string;
  type?: string;
  inputLabelprops?: { shrink: boolean };
}
export default function OutlinedTextField(props: OutlinedTextFieldProps) {
  const { value, onChange, label, type, inputLabelprops } = props;

  return (
    <TextField
      sx={{ width: "100%", my: 1 }}
      value={value}
      onChange={onChange}
      label={label}
      size="small"
      type={type || "text"}
      InputLabelProps={inputLabelprops}
    />
  );
}
