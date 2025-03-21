export type Pot = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  theme: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export interface PotFormData {
  name: string;
  targetAmount: number;
  theme: string;
}

export interface PotTransactionFormData {
  amount: number;
}
