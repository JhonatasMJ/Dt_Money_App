import { useTransactionContext } from "@/context/transaction.context";
import Checkbox from "expo-checkbox";
import { Text, TouchableOpacity, View } from "react-native";

export function CategoryFilter() {
  const { categories, handleCategoryFilter, filters } = useTransactionContext();

  return (
    <View className="mb-6">
      <Text className="text-base font-medium mb-4 text-gray-700">
        Categorias
      </Text>
      {categories.map(({ id, name }) => (
        <TouchableOpacity
          onPress={() => handleCategoryFilter(id)}
          key={`category-${id}`}
          className="flex-row items-center mt-3 py-2"
        >
          <Checkbox onValueChange={() => handleCategoryFilter(id)} className="mr-4" value={Boolean(filters.categoryIds[id])} />
          <Text className="text-white text-lg">{name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
