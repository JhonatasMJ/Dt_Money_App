import { useForm } from "react-hook-form";
import { formLoginParams } from "../../types/LoginParams";
import { Text } from "react-native";

export function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<formLoginParams>();

  return <>
    <Text className="text-white">Login</Text>
  </>;
}
