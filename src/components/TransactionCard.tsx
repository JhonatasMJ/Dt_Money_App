import { colors } from "@/shared/colors";
import { TransactionTypes } from "@/shared/enums/transactionTypes";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type TransactionCardType = TransactionTypes | "total";

interface Props {
  type: TransactionCardType;
  amount: number;
}

interface IconProps {
  name: keyof typeof MaterialIcons.glyphMap;
  color: string;
}

/* Design Pattern Strategy, para cada tipo de transação, tem um ícone diferente */
const ICONS: Record<TransactionCardType, IconProps> = {
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
  }
};

export function TransactionCard({ amount, type }: Props) {
  const iconData = ICONS[type];

  return (
    <View>
        <MaterialIcons name={iconData.name} color={iconData.color} size={26} />
    </View>
  )
}