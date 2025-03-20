"use client";

import { RecurringBill } from "@/types/bills";

export const useBillSummary = (bills: RecurringBill[] | undefined) => {
  const totalBillsAmount =
    bills?.reduce((sum, bill) => sum + bill.amount, 0) || 0;

  const paidBills = bills?.filter((bill) => bill.status === "PAID") || [];
  const upcomingBills =
    bills?.filter((bill) => bill.status === "UPCOMING") || [];
  const dueSoonBills =
    bills?.filter((bill) => bill.status === "DUE_SOON") || [];

  return {
    totalBillsAmount,
    paidBills,
    upcomingBills,
    dueSoonBills,
  };
};
