import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";
import { useBottomSheetContext } from "@/context/bottomSheet.context";
import { DateFilter } from "./DateFilter";
import { CategoryFilter } from "./CategoryFilter";
import { TypeFilter } from "./TypeFilter";
import Button from "./Button";
import { useTransactionContext } from "@/context/transaction.context";
import useErrorHandler from "@/shared/hooks/useErrorHandler";

export function TransactionFilters() {
  const { closeBottomSheet } = useBottomSheetContext();
  const { fetchTransactions, handleLoadings, resetFilter } = useTransactionContext();
  const { handleError } = useErrorHandler();

  const handleFetchTransactions = async () => {
    try {
      handleLoadings({ key: "refresh", value: true });
      await fetchTransactions({ page: 1 });
    } catch (error) {
      handleError(error, "Falha ao aplicar os filtros");
    } finally {
      handleLoadings({ key: "refresh", value: false });
      closeBottomSheet();
    }
  };

  const handleResetFilter = async () => {
    try {
      handleLoadings({ key: "refresh", value: true });
      await resetFilter();
    } catch (error) {
      handleError(error, "Falha ao limpar os filtros");
    } finally {
      handleLoadings({ key: "refresh", value: false });
      closeBottomSheet();
    }
  };


  return (
    <View className="flex-1 bg-gray[1000] p-6">
      <View className="flex-row justify-between items-center">
        <Text className="text-white text-xl font-bold">Filtrar Transações</Text>
        <TouchableOpacity onPress={closeBottomSheet}>
          <MaterialIcons name="close" size={20} color={colors.gray[600]} />
        </TouchableOpacity>
      </View>
      <DateFilter />
      <CategoryFilter />
      <TypeFilter />
      <View className="flex-row gap-4 mt-2">
        <Button onPress={handleResetFilter} className="flex-1" widthFull={false} mode="outline">
          Limpar Filtros
        </Button>
        <Button
          onPress={handleFetchTransactions}
          className="flex-1"
          widthFull={false}
        >
          Filtrar
        </Button>
      </View>
    </View>
  );
}
