import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTransactionContext } from "@/context/transaction.context";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ICONS, TransactionCardType } from "@/strategies/icon-strategy";
import { CARD_DATA } from "@/strategies/card-data-strategy";

interface Props {
  type: TransactionCardType;
  amount: number;
}

export function TransactionCard({ amount, type }: Props) {
  const iconData = ICONS[type];
  const cardData = CARD_DATA[type];
  const { transactions } = useTransactionContext();
  const lastTransaction = transactions.find(
    ({ type: TransactionTypes }) => TransactionTypes.id === type,
  );

  return (
    <View
      className={`bg-${cardData.bgcolor} min-w-[280] rounded-md px-8 py-6 justify-between mr-6 mt-4`}
    >
      <View className="flex-row items-center justify-between mt-1 ">
        <Text className="text-white text-base">{cardData.label}</Text>
        <MaterialIcons name={iconData.name} color={iconData.color} size={26} />
      </View>
      <View>
        <Text className="text-gray-400 text-2xl font-bold">
          R${amount.toFixed(2).replace(".", ",")}
        </Text>
        {type !== "total" && (
          <Text className="text-gray-700">
            {lastTransaction?.createdAt
              ? format(
                  lastTransaction?.createdAt,
                  `'Última ${cardData.label.toLocaleLowerCase()} em' d 'de' MMMM`,
                  { locale: ptBR },
                )
              : "Nenhuma transação encontrada"}
          </Text>
        )}
      </View>
    </View>
  );
}
