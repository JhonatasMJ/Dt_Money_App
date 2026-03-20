import { useSnackBarContext } from "@/context/snackbar.context";
import { Text, View } from "react-native";

export function SnackBar() {
  const { message, type } = useSnackBarContext();

/* Se não tiver erro não retorna a snackbar */
  if (!message || !type) {
    return <></>
  }

  const bgColor = `${type == 'SUCCESS' ? 'bg-accent-brand-background-primary' : 'bg-accent-red-background-primary'}`;

  return (
    <View className={`absolute bottom-10 self-center w-[90%] h-[50px] rounded-md  ${bgColor} justify-center z-10 p-2`}>
      <Text className="text-white text-base font-bold text-center">{message}</Text>
    </View>
  )
}