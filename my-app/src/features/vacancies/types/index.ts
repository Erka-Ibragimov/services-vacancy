export type Vacancy = {
  _id: string;
  company: string;
  position: string;
  salaryRange: string;
  status: Status;
  notes?: string;
};

export enum Status {
  New = "Новый",
  Reject = "Отказано",
  Approve = "Одобрено",
}

export enum VacancyModalMode {
  Create = "create",
  Edit = "edit",
}
