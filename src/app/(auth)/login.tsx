import { View} from "react-native";
import { DismissKeyboardView } from "@/components/DismissKeyboardView";
import { LoginForm } from "@/components/Forms/LoginForm";
import { AuthHeader } from "@/components/AuthHeader";

export default function Login () {
  return (
    <DismissKeyboardView>
      <View className="flex-1 w-[82%] self-center">
        <AuthHeader />
        <LoginForm />
      </View>
    </DismissKeyboardView>
  )
}