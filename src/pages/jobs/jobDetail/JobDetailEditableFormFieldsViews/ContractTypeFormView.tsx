import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { IContractTypeSelectorFormViewModel } from "../../../../interfaces/IContractTypeSelectorFormViewModel";

interface ContractTypeFormViewProps {
  ContractTypeFormViewModel: IContractTypeSelectorFormViewModel;
}
export default function ContractTypeFormView(props: ContractTypeFormViewProps) {
  const { ContractTypeFormViewModel } = props;
  const { selectContractType, contractTypeSelected, contractTypes } =
    ContractTypeFormViewModel;

  const handleSelectContractType = (e: SelectChangeEvent<number>) => {
    const { value } = e.target;
    selectContractType(typeof value === "string" ? parseInt(value) : value);
  };

  return (
    <FormControl size="small" sx={{ width: "100%", my: 1 }}>
      <InputLabel>Type de contrat</InputLabel>
      <Select
        onChange={handleSelectContractType}
        value={contractTypeSelected?.id || -1}
        label="Type de contrat"
      >
        <MenuItem value={-1} >Aucune sélection</MenuItem>
        {contractTypes.map((contractType) => (
          <MenuItem key={contractType.id} value={contractType.id}>
            {contractType.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
