import { TextField } from "@mui/material";

interface OutlinedTextFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index?: number) => any;
  label: string;
  type?: string;
  inputLabelprops?: { shrink: boolean };
  error?: boolean;
  helperText?: string;
  multiline?: boolean;
  inputMode?:
    | "text"
    | "email"
    | "tel"
    | "search"
    | "url"
    | "none"
    | "numeric"
    | "decimal"
    | undefined;
}
export default function OutlinedTextField(props: OutlinedTextFieldProps) {
  const {
    value,
    onChange,
    label,
    type,
    inputLabelprops,
    error,
    helperText,
    multiline,
    inputMode,
  } = props;

  return (
    <TextField
      sx={{ width: "100%", my: 1 }}
      value={value}
      onChange={onChange}
      label={label}
      size="small"
      type={type || "text"}
      InputLabelProps={inputLabelprops}
      error={error || false}
      helperText={helperText || ""}
      multiline={multiline || false}
      rows={3}
      inputMode={inputMode}
    />
  );
}
