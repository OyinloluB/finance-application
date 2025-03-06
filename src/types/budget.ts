export interface LatestTransaction {
  id: string;
  image: string;
  name: string;
  amount: number;
  date: string;
}

export interface Budget {
  id: string;
  category: string;
  maxLimit: number;
  currentSpend: number;
  remaining: number;
  theme: string;
  transactions: LatestTransaction[];
}
