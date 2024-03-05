import { useEffect, useState } from "react";
import { IEmailFormViewModel } from "../../../../interfaces/IEmailFormViewModel";
import { IContractTypeSelectorFormViewModel } from "../../../../interfaces/IContractTypeSelectorFormViewModel";
import { IPhoneFormViewModel } from "../../../../interfaces/IPhonesFormViewModel";
import { IDatePickerViewModel } from "../../../../interfaces/IDatePickerViewModel";
import { useParams } from "react-router-dom";
import { getJobDetailEditable } from "../../../../services/jobs.service";
import { patchJobDetailEditable } from "../../../../services/mission.service";
import { AxiosError } from "axios";
import { nirValidator } from "../../../../services/validator";
import { getJobDetailEditableDTO } from "../models/GetJobDetailEditableDTO";

export default function useJobDetailEditableFormViewModel(
  EmailViewModel: IEmailFormViewModel,
  ContractTypeFormViewModel: IContractTypeSelectorFormViewModel,
  PhoneViewModel: IPhoneFormViewModel,
  DatePickerViewModel: IDatePickerViewModel
) {
  const { jobId } = useParams();
  const { emails, initEmails, hasError: hasEmailError } = EmailViewModel;
  const { phones, initPhones, hasError: hasPhoneError } = PhoneViewModel;
  const { isoDate, initDate } = DatePickerViewModel;
  const [comments, setComments] = useState("");
  const [isPmtPresent, setIsPmtPresent] = useState(false);
  const [reference, setReference] = useState("");
  const [nir, setNir] = useState("");
  const [error, setError] = useState<AxiosError | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nirErrorMsg, setNirErrorMsg] = useState("");
  const [updateError, setUpdateError] = useState<AxiosError | null>(null);

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

  const isFormValid = !!!nirErrorMsg && !hasPhoneError && !hasEmailError;

  useEffect(() => {
    setIsLoading(true);
    getJobDetailEditable(jobId || "")
      .then(({ data }: { data: getJobDetailEditableDTO }) => {
        const apiValues = {
          nir: data.nir,
          ddn: data.ddn,
          emails: data.emails,
          phones: data.phones,
          selectedContractType: data.selectedContractType,
          contractTypes: data.contractTypes,
          reference: data.reference,
          comments: data.comments,
        };

        initFormFromApi(data);
        setInitialFormValues(apiValues);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }, [refresh]);

  const resetForm = () => initFormFromApi(initialFormValues);
  const retryAfterError = () => {
    setError(null);
    setRefresh(!refresh);
  };

  const initFormFromApi = (values: getJobDetailEditableDTO) => {
    updateNir(values.nir);
    initDate(values.ddn);
    initEmails(values.emails);
    initPhones(values.phones);
    initContractTypeSelected(values.contractTypes, values.selectedContractType);
    updateReference(values.reference);
    updateComment(values.comments);
  };

  const toggleIsPmtPresent = () => setIsPmtPresent(!isPmtPresent);

  const updateComment = (value: string) => setComments(value);

  const updateNir = (value: string) => {
    const nirValid = nirValidator(value);
    if (!nirValid) setNirErrorMsg("Numéro invalide ou clé invalide");
    else setNirErrorMsg("");
    setNir(value);
  };

  const cancelUpdateError = () => setUpdateError(null);

  const updateReference = (value: string) => setReference(value);

  const submitForm = () => {
    setUpdateError(null);
    patchJobDetailEditable({
      jobId,
      emails,
      comments,
      isPmtPresent,
      ddn: isoDate,
      phones,
      selectedContractType,
      nir
    })
      .then((res) => {
        setRefresh(!refresh);
        setUpdateError(null);
      })
      .catch((error: AxiosError) => setUpdateError(error));
  };

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
    error,
    retryAfterError,
    isLoading,
    nirErrorMsg,
    isFormValid,
    updateError,
    cancelUpdateError,
  };
}
