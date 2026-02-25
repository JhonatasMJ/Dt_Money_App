import { useForm } from "react-hook-form";
import { formLoginParams } from "../../types/LoginParams";
import { Text } from "react-native";
import { Input } from "../Input";

export function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<formLoginParams>();

  return <>
    <Input
      control={control}
      name="email"
      label="Email"
      placeholder="E-mail"
      leftIconName="mail-outline"
    />
      <Input
      control={control}
      name="password"
      label="Senha"
      placeholder="Senha"
      leftIconName="lock-outline"
      secureTextEntry
    />
  </>;
}
