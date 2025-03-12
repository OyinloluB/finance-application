export type BillStatus = "PAID" | "UPCOMING" | "DUE_SOON";

export type FrequencyType = "MONTHLY" | "YEARLY";

export interface RecurringBill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  image: string;
  status: BillStatus;
  frequency: FrequencyType;
}
