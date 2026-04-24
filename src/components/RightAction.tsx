import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { DeleteModal } from "./DeleteModal";

export function RightAction() {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  }

  const hideModal = () => {
    setModalVisible(false);
  }

  return (
    <>
      <TouchableOpacity
        onPress={showModal}
        activeOpacity={0.8}
        className="h-[140] bg-accent-red-background-primary w-[80] rounded-r-md items-center justify-center"
      >
        <MaterialIcons name="delete-outline" size={30} color="white" />
      </TouchableOpacity>
      <DeleteModal visible={modalVisible} hideModal={hideModal} />
    </>
  );
}
