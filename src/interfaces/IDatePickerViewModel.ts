export interface IDatePickerViewModel {
  updateDate: (e: any) => any;
  ddn: string;
  isoDate: string;
  initDate: (date: string) => any;
}
