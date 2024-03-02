import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { IContractTypeSelectorFormViewModel } from "../../../../interfaces/IContractTypeSelectorFormViewModel";

interface ContractTypeValueSelectorViewProps {
  ContractTypeValueSelectorViewModel: IContractTypeSelectorFormViewModel;
}
export default function ContractTypeValueSelectorView(
  props: ContractTypeValueSelectorViewProps
) {
  const { ContractTypeValueSelectorViewModel } = props;
  const {
    updateContractTypeValue,
    contractTypeValue,
    contractTypeValueOptions,
  } = ContractTypeValueSelectorViewModel;
  const handleOnSelect = (e: SelectChangeEvent<string>) => {
    updateContractTypeValue(e.target.value);
  };

  return (
    <FormControl size="small" sx={{ width: "100%", my: 1 }}>
      <InputLabel>Type de contrat</InputLabel>
      <Select
        onChange={handleOnSelect}
        value={contractTypeValue}
        label="Choississez une valeur"
      >
        {contractTypeValueOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
