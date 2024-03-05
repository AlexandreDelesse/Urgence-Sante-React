export interface IPhoneFormViewModel {
  phones: string[];
  addEmptyPhone: () => any;
  deletePhone: (indexToDelete: number) => any;
  updatePhone: (phoneContent: string, indexToUpdate: number) => any;
  initPhones: (phones: string[]) => any;
  hasEmptyPhone: boolean;
  getError: (index: number) => { index: number; msg: string } | undefined;
  hasError: boolean;
}
