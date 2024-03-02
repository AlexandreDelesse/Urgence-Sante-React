import { useState } from "react";

export default function useEmailsFormViewModel() {
  const [emails, setEmails] = useState<string[]>([]);

  const addEmptyEmail = () => {
    if (hasEmptyEmail()) return;
    else setEmails((old) => [...old, ""]);
  };

  const hasEmptyEmail = () => emails.some((email) => email === "");

  const deleteEmail = (indexToDelete: number) =>
    setEmails((old) => filterWithoutThisIndex(old, indexToDelete));

  const updateEmail = (emailContent: string, indexToUpdate: number) =>
    setEmails((old) =>
      replaceContentAtThisIndex(old, emailContent, indexToUpdate)
    );

  const initEmails = (emails: string[]) => setEmails(emails);

  const filterWithoutThisIndex = (list: string[], index: number) =>
    list.filter((el, i) => i === index);

  const replaceContentAtThisIndex = (
    list: string[],
    newContent: string,
    indexToUpdate: number
  ) => list.map((el, i) => (i === indexToUpdate ? newContent : el));

  return { emails, addEmptyEmail, deleteEmail, updateEmail, initEmails };
}
