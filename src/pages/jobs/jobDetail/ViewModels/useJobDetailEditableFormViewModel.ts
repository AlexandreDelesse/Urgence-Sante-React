import { useEffect, useState } from "react";
import { IEmailFormViewModel } from "../../../../interfaces/IEmailFormViewModel";
import { IContractTypeSelectorFormViewModel } from "../../../../interfaces/IContractTypeSelectorFormViewModel";
import { IPhoneFormViewModel } from "../../../../interfaces/IPhonesFormViewModel";
import { IDatePickerViewModel } from "../../../../interfaces/IDatePickerViewModel";
import { useParams } from "react-router-dom";
import { getJobDetailEditable } from "../../../../services/jobs.service";
import { patchJobDetailEditable } from "../../../../services/mission.service";

export default function useJobDetailEditableFormViewModel(
  EmailViewModel: IEmailFormViewModel,
  ContractTypeFormViewModel: IContractTypeSelectorFormViewModel,
  PhoneViewModel: IPhoneFormViewModel,
  DatePickerViewModel: IDatePickerViewModel
) {
  const { jobId } = useParams();
  const { emails, initEmails } = EmailViewModel;
  const { phones, initPhones } = PhoneViewModel;
  const { isoDate, initDate } = DatePickerViewModel;
  const [comments, setComments] = useState("");
  const [isPmtPresent, setIsPmtPresent] = useState(false);
  const [reference, setReference] = useState("");
  const [nir, setNir] = useState("");

  const {
    updateContractTypes,
    contractTypeSelected,
    contractTypes,
    contractTypeValue,
    initContractTypeSelected,
  } = ContractTypeFormViewModel;

  const selectedContractType = contractTypeSelected
    ? {
        id: contractTypeSelected.id,
        hasSelectedValue: !!contractTypeValue,
        selectedValue: contractTypeValue,
      }
    : null;

  const [initialFormValues, setInitialFormValues] = useState<any | null>(null);

  useEffect(() => {
    getJobDetailEditable(jobId || "")
      .then((request) => {
        console.log("init infos");
        const values = request.data;
        const apiValues = {
          nir: values.nir,
          ddn: values.ddn,
          emails: values.emails,
          phones: values.phones,
          selectedContractType: values.SelectedContractType,
          contractTypes: values.contractTypes,
          reference: values.reference,
        };
        setInitialFormValues(apiValues);
        initFormFromApi(apiValues);
      })
      .catch((error) => console.log(error));
  }, []);

  const resetForm = () => initFormFromApi(initialFormValues);

  const initFormFromApi = (values: any) => {
    setNir(values.nir);
    initDate(values.ddn);
    initEmails(values.emails);
    initPhones(values.phones);
    updateContractTypes(values.contractTypes);
    initContractTypeSelected(values.selectedContractType);
    updateReference(values.reference);
  };

  const toggleIsPmtPresent = () => setIsPmtPresent(!isPmtPresent);

  const updateComment = (value: string) => setComments(value);

  const updateNir = (value: string) => setNir(value);

  const updateReference = (value: string) => setReference(value);

  const submitForm = () =>
    console.log({
      jobId,
      emails,
      comments,
      isPmtPresent,
      ddn: isoDate,
      phones,
      selectedContractType,
      reference,
    });
  // patchJobDetailEditable({
  //   jobId,
  //   emails,
  //   comments,
  //   isPmtPresent,
  //   ddn: isoDate,
  //   phones,
  //   selectedContractType,
  // })
  //   .then((res) => console.log(res))
  //   .catch((error) => console.log(error));

  return {
    contractTypes,
    reference,
    updateReference,
    comments,
    updateComment,
    isPmtPresent,
    selectedContractType,
    toggleIsPmtPresent,
    submitForm,
    contractTypeSelected,
    nir,
    updateNir,
    resetForm,
  };
}
