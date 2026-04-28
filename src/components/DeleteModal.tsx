import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";

interface Props {
  visible: boolean;
  hideModal: () => void;
  handleDeleteTransaction: () => void;
  loading: boolean;
}

export function DeleteModal({
  visible,
  hideModal,
  handleDeleteTransaction,
  loading,
}: Props) {
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
                    <MaterialIcons
                      name="close"
                      size={25}
                      color={colors.gray[800]}
                    />
                  </TouchableOpacity>
                </View>
                <View className="pt-3 flex-1 border-b border-gray-300 items-center justify-center">
                  <Text className="text-gray-500 text-lg leading-8">
                    Tem certeza que deseja apagar esta transação? Esta ação não
                    pode ser desfeita.
                  </Text>
                </View>
                <View className="flex-row justify-between gap-4 w-full py-6">
                  <TouchableOpacity onPress={hideModal} className="flex-1 w-full bg-none border-2 border-accent-brand items-center justify-center rounded-md p-3">
                    <Text className="text-accent-brand font-bold">
                      Cancelar
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleDeleteTransaction}
                    className="flex-1 w-full bg-accent-red items-center justify-center rounded-md p-3"
                  >
                    <Text className="text-white font-bold">
                      {loading ? (
                        <ActivityIndicator size="small" color={colors.white} />
                      ) : (
                        "Apagar"
                      )}
                    </Text>
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
