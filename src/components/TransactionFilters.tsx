import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";
import { useBottomSheetContext } from "@/context/bottomSheet.context";
import { DateFilter } from "./DateFilter";
import { CategoryFilter } from "./CategoryFilter";

export function TransactionFilters() {
  const { closeBottomSheet } = useBottomSheetContext();

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
    </View>
  );
}
