import { ReactNode } from "react";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import OutlinedTextField from "./JobDetailEditableFormFieldsViews/OutlinedTextField";
import EmailListFormView from "./JobDetailEditableFormFieldsViews/EmailListFormView";
import useJobDetailEditableFormViewModel from "./ViewModels/useJobDetailEditableFormViewModel";
import useEmailsFormViewModel from "./ViewModels/useEmailsFormViewModel";
import SaveIcon from "@mui/icons-material/Save";
import ContractTypeFormView from "./JobDetailEditableFormFieldsViews/ContractTypeFormView";
import ContractTypeValueSelectorView from "./JobDetailEditableFormFieldsViews/ContractTypeValueSelectorView";
import useContractTypeFormViewModel from "./ViewModels/useContractTypeFormViewModel";
import usePhonesFormViewModel from "./ViewModels/usePhonesFormViewModel";
import PhoneListFormView from "./JobDetailEditableFormFieldsViews/PhoneListFormView";
import useDatePickerViewModel from "./ViewModels/useDatePickerViewModel";
import DatePickerView from "./JobDetailEditableFormFieldsViews/DatePickerView";

export default function JobDetailEditableFormView() {
  const EmailFormViewModel = useEmailsFormViewModel();
  const ContractTypeFormViewModel = useContractTypeFormViewModel();
  const PhoneFormViewModel = usePhonesFormViewModel();
  const DatePickerViewModel = useDatePickerViewModel();

  const {
    submitForm,
    toggleIsPmtPresent,
    reference,
    updateReference,
    isPmtPresent,
    contractTypeSelected,
    comments,
    updateComment,
    nir,
    updateNir,
  } = useJobDetailEditableFormViewModel(
    EmailFormViewModel,
    ContractTypeFormViewModel,
    PhoneFormViewModel,
    DatePickerViewModel
  );

  const showPmtView = !!contractTypeSelected && contractTypeSelected.hasPmt;
  const showContractTypeValueSelector =
    !!contractTypeSelected && contractTypeSelected.values.length > 1;
  const showReference =
    !!contractTypeSelected && contractTypeSelected.referenceLabel;

  return (
    <div>
      <FormSection title="Informations client">
        <DatePickerView DatePickerViewModel={DatePickerViewModel} />
        <OutlinedTextField
          label="N° sécurité sociale"
          value={nir}
          onChange={(e) => updateNir(e.target.value)}
        />

        <EmailListFormView EmailFormViewModel={EmailFormViewModel} />
        <PhoneListFormView PhoneFormViewModel={PhoneFormViewModel} />
      </FormSection>

      <FormSection title="Mission">
        <ContractTypeFormView
          ContractTypeFormViewModel={ContractTypeFormViewModel}
        />
        {showPmtView && (
          <FormControlLabel
            sx={{ my: 1 }}
            control={
              <Checkbox
                checked={isPmtPresent}
                onClick={toggleIsPmtPresent}
                size="small"
              />
            }
            label="J'ai une préscription médicale"
          />
        )}
        {showContractTypeValueSelector && (
          <ContractTypeValueSelectorView
            ContractTypeValueSelectorViewModel={ContractTypeFormViewModel}
          />
        )}
        {showReference && (
          <OutlinedTextField
            label={contractTypeSelected.referenceLabel || "Refence"}
            value={reference}
            onChange={(e) => updateReference(e.target.value)}
          />
        )}

        <OutlinedTextField
          value={comments}
          onChange={(e) => updateComment(e.target.value)}
          label="Commentaire"
        />
      </FormSection>
      <Button
        variant="contained"
        color="primary"
        startIcon={<SaveIcon />}
        onClick={submitForm}
      >
        Sauvegarder
      </Button>
    </div>
  );
}

interface FormSectionProps {
  title?: string;
  children?: ReactNode;
}
const FormSection = (props: FormSectionProps) => {
  const { title, children } = props;
  return (
    <Card sx={{ my: 2 }} elevation={0}>
      <CardContent>
        {title && (
          <Typography sx={{ mb: "16px", fontSize: 18 }} component="div">
            {title}
          </Typography>
        )}
        {children}
      </CardContent>
    </Card>
  );
};
