import { useForm } from "react-hook-form";
import { formLoginParams } from "../../types/LoginParams";
import { Input } from "../Input";
import Button from "../Button";
import { Text, View } from "react-native";

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

    <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
    <Button iconName="arrow-forward">
      Login
    </Button>
    <View>
      <Text className="mb-6 text-gray-300 text-base">Ainda não possui uma conta?</Text>
      <Button mode="outline" iconName="arrow-forward">
      Cadastrar
    </Button>
    </View>
    </View>
 
  </>;
}
