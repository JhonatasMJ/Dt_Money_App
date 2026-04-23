import { colors } from "@/shared/colors";
import { TransactionTypes } from "@/shared/enums/transactionTypes";
import { Text, View } from "react-native";
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
  },
};

interface CardProps {
  label: string;
  bgcolor: string;
}

const CARD_DATA: Record<TransactionCardType, CardProps> = {
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

export function TransactionCard({ amount, type }: Props) {
  const iconData = ICONS[type];
  const cardData = CARD_DATA[type];

  return (
    <View
      className={`bg-${cardData.bgcolor} min-w-[280] rounded-md px-8 py-6 justify-between mr-6 mt-4`}
    >
      <View className="flex-row items-center justify-between mt-1 ">
        <Text className="text-white text-base">{cardData.label}</Text>
        <MaterialIcons name={iconData.name} color={iconData.color} size={26} />
      </View>
      <View>
        <Text className="text-gray-400 text-2xl font-bold">R${amount.toFixed(2).replace(".", ",")}</Text>
      </View>
    </View>
  );
}
