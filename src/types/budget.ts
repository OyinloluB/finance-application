import { themeColors } from "@/utils/themeColors";

export interface LatestTransaction {
  id: string;
  image: string;
  name: string;
  amount: number;
  date: string;
  recipient: {
    name: string;
  };
}

export interface Budget {
  id: string;
  category: string;
  maxLimit: number;
  currentSpend: number;
  remaining: number;
  theme: keyof typeof themeColors;
  transactions?: LatestTransaction[];
}

export interface BudgetFormData {
  category: string;
  maxLimit: number;
  theme: string;
}
