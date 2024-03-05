import { useEffect, useState } from "react";

export default function usePhonesFormViewModel() {
  const [phones, setPhones] = useState<string[]>([]);
  const [phoneErrors, setPhoneErrors] = useState<
    { index: number; msg: string }[]
  >([]);
  const hasEmptyPhone = phones.some((phone) => phone === "");

  const addEmptyPhone = () => {
    if (hasEmptyPhone) return;
    else setPhones((old) => [...old, ""]);
  };

  const hasError = !!phoneErrors.length;

  const deletePhone = (indexToDelete: number) =>
    setPhones((old) => filterWithoutThisIndex(old, indexToDelete));

  const filterWithoutThisIndex = (list: string[], index: number) =>
    list.filter((el, i) => i !== index);

  const updatePhone = (phoneContent: string, indexToUpdate: number) =>
    setPhones((old) =>
      old.map((el, i) =>
        i === indexToUpdate
          ? formatPhoneWithoutDash(phoneContent)
          : formatPhoneWithoutDash(el)
      )
    );

  useEffect(() => {
    const emptyPhoneErrors = phones
      .map((el, index) => ({
        value: el,
        index,
        msg: "Renseignez ou supprimez l'email",
      }))
      .filter((el) => el.value == "");
    setPhoneErrors(emptyPhoneErrors);
  }, [phones]);

  const getError = (index: number) =>
    phoneErrors.find((el, i) => el.index === index);

  const formatPhoneWithoutDash = (phone: string) => phone.split("-").join("");
  const formatMultiplePhonesWithoutDash = (phones: string[]) =>
    phones.map((phone) => formatPhoneWithoutDash(phone));

  const initPhones = (phonesInit: string[]) =>
    setPhones(formatMultiplePhonesWithoutDash(phonesInit));

  return {
    phones,
    addEmptyPhone,
    deletePhone,
    updatePhone,
    initPhones,
    hasEmptyPhone,
    getError,
    hasError,
  };
}
