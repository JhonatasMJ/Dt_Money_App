import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";

interface Props {
  visible: boolean;
  hideModal: () => void;
}

export function DeleteModal({ visible, hideModal }: Props) {
  return (
    <View className="flex-1 absolute">
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={hideModal}
      >
        <TouchableWithoutFeedback onPress={hideModal}>
          <View className="flex-1 items-center justify-center bg-black/50">
            <TouchableWithoutFeedback
              onPress={(event) => event.stopPropagation()}
            >
              <View className="m-5 bg-background-secondary rounded-lg p-8 items-center shadow-lg w-[90%] h-[322] z-9">
                <View className="w-full flex-row justify-between items-center border-b border-gray-300 pb-6">
                  <View className="flex-row gap-6 items-center">
                    <MaterialIcons
                      name="error-outline"
                      size={25}
                      color={colors.gray[400]}
                      className="mr-4"
                    />
                  </View>
                  <Text className="text-white text-lg font-bold">
                    Apagar transação?
                  </Text>
                <TouchableOpacity>
                    <MaterialIcons name="close" size={25} color={colors.gray[800]} />
                </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
