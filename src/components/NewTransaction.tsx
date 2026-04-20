import { CreateTransactionRequest } from "@/shared/interfaces/https/create-transaction-request";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import {MaterialIcons} from '@expo/vector-icons'
import { colors } from "@/shared/colors";
import { useBottomSheetContext } from "@/context/bottomSheet.context";
import CurrencyInput from "react-native-currency-input";
import { SelectType } from "./SelectType";
import { CategoryModal } from "./CategoryModal";
export function NewTransaction() {

  const {closeBottomSheet} = useBottomSheetContext();

  const [transaction,setTransaction] = useState<CreateTransactionRequest>({
    categoryId: 0,
    description: '',
    typeId: 0,
    value: 0,
  })

  /* Seta os dados da transação, todos de uma vez e só repasso no input */
  const setTransactionData = (key: keyof CreateTransactionRequest, value: string | number) => { 
    setTransaction((prevData) => ({
      ...prevData,
      [key]: value
    }))
  }
  return (
    <View className="px-8 py-5">
      <TouchableOpacity onPress={closeBottomSheet} className="w-full flex-row items-center justify-between">
        <Text className="text-white text-xl font-bold">
          Nova Transação
        </Text>
        <MaterialIcons name="close" size={20} color={colors.gray[700]} />
      </TouchableOpacity>
      <View className="flex-1 my-8">
        <TextInput 
        onChangeText={(text) => setTransactionData('description', text)}
        placeholder="Descrição" 
        placeholderTextColor={colors.gray[700]}
        value={transaction.description}
        className="text-white text-lg h-50 bg-background-primary my-2 rounded-md px-4"/>

        <CurrencyInput 
        prefix="R$ "
        delimiter="."
        separator=","
        precision={2}
        minValue={0}
        onChangeText={(value) => setTransactionData('value', value ?? 0)}
        placeholder="Valor" 
        placeholderTextColor={colors.gray[700]}
        value={transaction.value}
        className="text-white text-lg h-50 bg-background-primary my-2 rounded-md px-4"/>

        <CategoryModal
        selectedCategory={transaction.categoryId}
        onSelect={(categoryId) => setTransactionData('categoryId', categoryId)}
        />
        <SelectType
        typeId={transaction.typeId}
        setTransactionType={(typeId) => setTransactionData('typeId', typeId)}
        />
      </View>
    </View>
  )
}