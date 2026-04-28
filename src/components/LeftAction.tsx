import { Transaction } from "@/shared/interfaces/transaction";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useBottomSheetContext } from "@/context/bottomSheet.context";
import { EditTransactionForm } from "./Forms/EditTransaction";
interface Params {
  transaction: Transaction;
}

export const LeftAction = ({ transaction }: Params) => {
  const { openBottomSheet } = useBottomSheetContext();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => openBottomSheet(<EditTransactionForm transaction={transaction} />, 1)}
      className="h-[140] bg-accent-blue-dark w-[80] rounded-l-md items-center justify-center"
    >
      <MaterialIcons name="edit" size={30} color="white" />
    </TouchableOpacity>
  );
};
