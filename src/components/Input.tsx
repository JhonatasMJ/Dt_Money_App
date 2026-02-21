import { Controller, FieldValues } from "react-hook-form";
import { InputParams } from "../types/Input";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../shared/colors";

export function Input<T extends FieldValues>({
  control,
  name,
  leftIconName,
  label,
  ...rest
}: InputParams<T>) { 
  return (
    <Controller
      control={control}
      name={name}
      render={({field:{onChange, value}}) =>{
        return (
          <View className="w-full ">
            {label && <Text className="text-white text-sm mb-1">
              {label}
              </Text>}
              <TouchableOpacity  className="flex-row items-center justify-between border-b  border-gray-600 px-3 py-2 h-16">
                <TextInput
                 value={value}
                 onChangeText={onChange}
                 placeholderTextColor={colors.gray[700]}
                 {...rest}
                />
              </TouchableOpacity>
          </View>
        )
      }}
      
    />
  )
}