/* Design Pattern Strategy, para cada tipo de transação, tem um ícone diferente */

import { colors } from "@/shared/colors";
import { TransactionTypes } from "@/shared/enums/transactionTypes";
import { MaterialIcons } from "@expo/vector-icons";

export type TransactionCardType = TransactionTypes | "total";

interface IconProps {
  name: keyof typeof MaterialIcons.glyphMap;
  color: string;
}



export const ICONS: Record<TransactionCardType, IconProps> = {
  [TransactionTypes.REVENUE]: {
    color: colors["accent-brand-light"],
    name: "arrow-circle-up",
  },
  [TransactionTypes.EXPENSE]: {
    color: colors["accent-red"],
    name: "arrow-circle-down",
  },
  total: {
    color: colors.white,
    name: "attach-money",
  },
};



