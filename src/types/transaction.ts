import { CategoryType } from "./categories";

export interface Transaction {
  id: string;
  name: string;
  recipient: {
    name: string;
  };
  image: string;
  category: CategoryType;
  date: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  recipientId?: string;
}

export interface TransactionFormData {
  amount: number;
  category: CategoryType;
  date: string;
  type: "INCOME" | "EXPENSE";
  recipientId?: string;
}
