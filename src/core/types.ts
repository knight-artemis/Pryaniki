export type DataType = {
  id: string;
  documentStatus: string;
  employeeNumber: string;
  documentType: string;
  documentName: string;
  companySignatureName: string;
  employeeSignatureName: string;
  employeeSigDate: string | moment.Moment;
  companySigDate: string | moment.Moment;
};
