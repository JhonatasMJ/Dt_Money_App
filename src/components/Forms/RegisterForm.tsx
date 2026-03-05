import { useForm } from "react-hook-form";
import { formRegisterParams } from "@/types/RegisterParams";
import { Input } from "../Input";
import Button from "../Button";
import { Text, View } from "react-native";
import { router } from "expo-router";

export function RegisterForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<formRegisterParams>();

  return <>
    <Input
      control={control}
      name="name"
      label="Nome"
      placeholder="Nome"
      leftIconName="person"
    />
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
       <Input
      control={control}
      name="confirmPassword"
      label="Confirmar senha"
      placeholder="Confirme sua senha"
      leftIconName="lock-outline"
      secureTextEntry
    />

    <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
    <Button iconName="arrow-forward">
      Cadastrar
    </Button>
    <View>
      <Text className="mb-6 text-gray-300 text-base">Já possui uma conta?</Text>
      <Button mode="outline" iconName="arrow-forward" onPress={ () => router.push('/(auth)/login')}>
      Acessar
    </Button>
    </View>
    </View>
 
  </>;
}
