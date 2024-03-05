export interface IEmailFormViewModel {
  emails: string[];
  addEmptyEmail: () => void;
  deleteEmail: (indexToDelete: number) => void;
  updateEmail: (emailContent: string, indexToUpdate: number) => void;
  initEmails: (emials: string[]) => any;
  hasEmptyEmail: boolean;
  getError: (index: number) => { index: number; msg: string } | undefined;
  hasError: boolean
}
