import useKeyboardVisible from "@/shared/hooks/useKeyboardVisible";
import { Image, View } from "react-native";

export function AuthHeader() {
  const keyboardVisible = useKeyboardVisible()

  /* Se o teclado estiver sendo exibido, não mostra o header */
  if (keyboardVisible) { 
    return <></>
  } 

  return (
    <View className="items-center justify-center w-full min-h-40">
      <Image
      className="h-[48px] w-[255px]"
      source={require("@/assets/Logo.png")}
      />
    </View>
  )
}