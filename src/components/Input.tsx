import { Controller, FieldValues } from "react-hook-form";
import { InputParams } from "../types/Input";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../shared/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import clsx from "clsx";

export function Input<T extends FieldValues>({
  control,
  name,
  leftIconName,
  secureTextEntry,
  label,
  ...rest
}: InputParams<T>) {
/* Pega ref do input, como por exemplo o foco */
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(secureTextEntry);
 
  /* Verifica se o input está focado */
const checkFocus = () => {
  if (inputRef.current) {
    setIsFocused(inputRef.current.isFocused());
  }
};

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          /* Se o input estiver focado, o label vai ficar verde, o clsx serve para fazer condicionais de formas mais simples*/
          <View className="w-full mt-4 ">
            {label && <Text className={clsx("mb-2 mt-3 text-base", isFocused ? "text-accent-brand" : "text-gray-600")}>{label}</Text>}
            <TouchableOpacity className="flex-row items-center justify-between border-b  border-gray-600  py-2 h-16">
              {leftIconName && (
                <MaterialIcons
                  name={leftIconName}
                  color={isFocused ? colors['accent-brand'] : colors.gray[600]}
                  size={24}
                  className="mr-2"
                />
              )}
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholderTextColor={colors.gray[700]}
                className="flex-1 text-base text-gray-500"
                ref={inputRef}
                onFocus={checkFocus}
                onEndEditing={checkFocus}
                secureTextEntry={showPassword}
                {...rest}
              />
              {secureTextEntry && (
                  <TouchableOpacity onPress={() => setShowPassword(value => !value)}>
                    <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    color={colors.gray[600]}
                    size={20}
                    />
                  </TouchableOpacity>  
                )}
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
}
