export interface IEmailFormViewModel {
  emails: string[];
  addEmptyEmail: () => void;
  deleteEmail: (indexToDelete: number) => void;
  updateEmail: (emailContent: string, indexToUpdate: number) => void;
  initEmails: (emials: string[]) => any
}
