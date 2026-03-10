import { View} from "react-native";
import { DismissKeyboardView } from "@/components/DismissKeyboardView";
import { LoginForm } from "@/components/Forms/LoginForm";
import { AuthHeader } from "@/components/AuthHeader";
import { useAuthContext } from "@/context/auth.context";

export default function Login () {

  const {user} = useAuthContext();

  return (
    <DismissKeyboardView>
      <View className="flex-1 w-[82%] self-center">
        <AuthHeader />
        <LoginForm />
      </View>
    </DismissKeyboardView>
  )
}