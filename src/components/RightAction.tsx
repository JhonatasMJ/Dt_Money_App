import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { DeleteModal } from "./DeleteModal";
import * as transactionServices from "@/shared/services/transaction.service";
import useErrorHandler from "@/shared/hooks/useErrorHandler";
import { useSnackBarContext } from "@/context/snackbar.context";

interface Params {
  id: number;
}

export function RightAction({ id }: Params) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleError } = useErrorHandler();
  const { notify } = useSnackBarContext();

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleDeleteTransaction = async () => {
    try {
      setLoading(true);
      await transactionServices.deleteTransaction(id);
      notify({
        message: "Transação deletada com sucesso",
        messageType: "SUCCESS",
      });
      hideModal();
    } catch (error) {
      handleError(error, "Falha ao deletar transação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={showModal}
        activeOpacity={0.8}
        className="h-[140] bg-accent-red-background-primary w-[80] rounded-r-md items-center justify-center"
      >
        <MaterialIcons name="delete-outline" size={30} color="white" />
      </TouchableOpacity>
      <DeleteModal
        loading={loading}
        handleDeleteTransaction={handleDeleteTransaction}
        visible={modalVisible}
        hideModal={hideModal}
      />
    </>
  );
}
