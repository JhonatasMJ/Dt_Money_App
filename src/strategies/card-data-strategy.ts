import { TransactionCardType } from "./icon-strategy";
import { TransactionTypes } from "@/shared/enums/transactionTypes";

interface CardProps {
    label: string;
    bgcolor: string;
  }

export const CARD_DATA: Record<TransactionCardType, CardProps> = {
    [TransactionTypes.REVENUE]: {
      label: "Entrada",
      bgcolor: "background-tertiary",
    },
    [TransactionTypes.EXPENSE]: {
      label: "Saída",
      bgcolor: "background-tertiary",
    },
    total: {
      label: "Total",
      bgcolor: "accent-brand-background-primary",
    },
  };