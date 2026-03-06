import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";
import { PropsWithChildren } from "react";

export function ErrorMessage({ children }: PropsWithChildren) { 
  return (
  <View className="flex-row items-center mt-1">
    <MaterialIcons name="error-outline" color={colors["accent-red-background-primary"]} size={16} className="mr-1" />
    <Text className=" text-accent-red-background-primary">
      {children}
    </Text>
  </View>
  )
}