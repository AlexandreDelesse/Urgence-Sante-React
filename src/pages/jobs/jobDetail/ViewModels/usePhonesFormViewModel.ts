import { useState } from "react";

export default function usePhonesFormViewModel() {
  const [phones, setPhones] = useState<string[]>([]);

  const addEmptyPhone = () => {
    if (hasEmptyPhone()) return;
    else setPhones((old) => [...old, ""]);
  };

  const hasEmptyPhone = () => phones.some((phone) => phone === "");

  const deletePhone = (indexToDelete: number) =>
    setPhones((old) => filterWithoutThisIndex(old, indexToDelete));

  const filterWithoutThisIndex = (list: string[], index: number) =>
    list.filter((el, i) => i === index);

  const updatePhone = (phoneContent: string, indexToUpdate: number) =>
    setPhones((old) =>
      old.map((el, i) => (i === indexToUpdate ? phoneContent : el))
    );

  const initPhones = (phonesInit: string[]) => setPhones(phonesInit);

  return { phones, addEmptyPhone, deletePhone, updatePhone, initPhones };
}
