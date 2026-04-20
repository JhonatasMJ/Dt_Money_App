import { useTransactionContext } from "@/context/transaction.context";
import clsx from "clsx";
import { useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Checkbox } from "expo-checkbox";

interface Props {
  selectedCategory: number;
  onSelect: (categoryId: number) => void;
}

export function CategoryModal({ selectedCategory, onSelect }: Props) {
  const [showModal, setShowModal] = useState(false);
  const { categories } = useTransactionContext();

  const handleModal = () => {
    setShowModal((prev) => !prev);
  };

  const selected = useMemo(
    () => categories.find(({ id }) => id === selectedCategory),
    [categories, selectedCategory],
  );

  const handleSelect = (categoryId: number) => {
    onSelect(categoryId);
    setShowModal(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={handleModal}
        className={clsx(
          "h-[50] text-gray-700 text-lg bg-background-primary my-2 rounded-md pl-4 justify-center ",
        )}
      >
        <Text
          className={clsx("text-lg", selected ? "text-white" : "text-gray-700")}
        >
          {selected?.name ?? "Categoria"}
        </Text>
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={handleModal}>
          <View className="flex-1 items-center justify-center bg-black/50">
            <View className="w-[90%] bg-background-secondary p-4 rounded-xl">
              <Text className="text-white text-lg font-bold">
                Selecione uma categoria
              </Text>
              <FlatList
                keyExtractor={(item) => `category-${item.id}`}
                data={categories}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelect(item.id)}
                    className="flex-row items-center bg-gray-800 rounded-md mt-3 gap-2 p-4"
                  >
                    <Checkbox
                      value={selected?.id === item.id}
                      onValueChange={() => handleSelect(item.id)}
                    />
                    <Text className="text-white text-lg">{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
