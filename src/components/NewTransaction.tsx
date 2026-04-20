import { CreateTransactionRequest } from "@/shared/interfaces/https/create-transaction-request";
import { useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";
import { useBottomSheetContext } from "@/context/bottomSheet.context";
import CurrencyInput from "react-native-currency-input";
import { SelectType } from "./SelectType";
import { CategoryModal } from "./CategoryModal";
import { transactionSchema } from "@/schemas/transactionSchema";
import * as Yup from "yup";
import Button from "./Button";
import { ErrorMessage } from "./ErrorMessage";
import { useTransactionContext } from "@/context/transaction.context";
import useErrorHandler from "@/shared/hooks/useErrorHandler";

type ValidationErrors = Record<keyof CreateTransactionRequest, string>;

export function NewTransaction() {
  const { closeBottomSheet } = useBottomSheetContext();
  const {createTransaction} = useTransactionContext();
  const {handleError} = useErrorHandler();
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState<CreateTransactionRequest>({
    categoryId: 0,
    description: "",
    typeId: 0,
    value: 0,
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>();

  const handleCreateTransaction = async () => {
    try {
      setLoading(true);
      await transactionSchema.validate(transaction, { abortEarly: false });
      await createTransaction(transaction);
      closeBottomSheet();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {} as ValidationErrors;

        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof CreateTransactionRequest] = err.message;
          }
        });

        setValidationErrors(errors);
      } else {
        handleError(error, 'Falha ao criar transação');
      }
    } finally {
      setLoading(false);
    }
  };

  /* Seta os dados da transação, todos de uma vez e só repasso no input */
  const setTransactionData = (
    key: keyof CreateTransactionRequest,
    value: string | number,
  ) => {
    setTransaction((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  return (
    <View className="px-8 py-5">
      <TouchableOpacity
        onPress={closeBottomSheet}
        className="w-full flex-row items-center justify-between"
      >
        <Text className="text-white text-xl font-bold">Nova Transação</Text>
        <MaterialIcons name="close" size={20} color={colors.gray[700]} />
      </TouchableOpacity>
      <View className="flex-1 my-8">
        <TextInput
          onChangeText={(text) => setTransactionData("description", text)}
          placeholder="Descrição"
          placeholderTextColor={colors.gray[700]}
          value={transaction.description}
          className="text-white text-lg h-50 bg-background-primary my-2 rounded-md px-4"
        />
        { validationErrors?.description && <ErrorMessage>{validationErrors.description}</ErrorMessage>}

        <CurrencyInput
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          minValue={0}
          onChangeValue={(value) => setTransactionData("value", value ?? 0)}
          placeholder="Valor"
          placeholderTextColor={colors.gray[700]}
          value={transaction.value}
          className="text-white text-lg h-50 bg-background-primary my-2 rounded-md px-4"
        />
        { validationErrors?.value && <ErrorMessage>{validationErrors.value}</ErrorMessage>}

        <CategoryModal
          selectedCategory={transaction.categoryId}
          onSelect={(categoryId) =>
            setTransactionData("categoryId", categoryId)
          }
        />
        { validationErrors?.categoryId && <ErrorMessage>{validationErrors.categoryId}</ErrorMessage>}
        <SelectType
          typeId={transaction.typeId}
          setTransactionType={(typeId) => setTransactionData("typeId", typeId)}
        />
        { validationErrors?.typeId && <ErrorMessage>{validationErrors.typeId}</ErrorMessage>}
        <View className="my-4">
          <Button onPress={handleCreateTransaction}>
           {loading ? <ActivityIndicator size="small" color={colors.white} /> : <Text>Registrar</Text>}
          </Button>
        </View>
      </View>
    </View>
  );
}
