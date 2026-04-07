import { Text, View } from "react-native";
import { PropsWithChildren } from "react";

export function ErrorMessage({ children }: PropsWithChildren) { 
  return (
  <View className="flex-row items-center mt-4">
    <Text className=" text-accent-red-background-primary">
      {children}
    </Text>
  </View>
  )
}