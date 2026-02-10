import { Text, View, TextInput } from "react-native";
import { DismissKeyboardView } from "../../components/DismissKeyboardView";
import { LoginForm } from "../../components/Forms/LoginForm";

export default function Login () {
  return (
    <DismissKeyboardView>
      <View className="flex-1 w-[82%] self-center">
        <LoginForm />
      </View>
    </DismissKeyboardView>
  )
}