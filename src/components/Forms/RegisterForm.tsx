import { useForm, Resolver } from "react-hook-form";
import { Input } from "../Input";
import Button from "../Button";
import { ActivityIndicator, Text, View } from "react-native";
import { router } from "expo-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/schemas/registerSchema";
import { formRegisterParams } from "@/types/RegisterParams";
import { useAuthContext } from "@/context/auth.context";
import useErrorHandler from "@/shared/hooks/useErrorHandler";
import { colors } from "@/shared/colors";

export function RegisterForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<formRegisterParams>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(registerSchema) as Resolver<formRegisterParams>,
  });

  const { handleRegister } = useAuthContext();
  const {handleError} = useErrorHandler();
  const onSubmit = async (userData: formRegisterParams) => {
    try {
      await handleRegister(userData);
    } catch (error) {
      handleError(error, 'Falha ao cadastrar')
    }
  };
  return (
    <>
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
        <Button iconName="arrow-forward" onPress={handleSubmit(onSubmit)}>
        {isSubmitting ? <ActivityIndicator color={colors.white}/> : 'Cadastrar'}
        </Button>
        <View>
          <Text className="mb-6 text-gray-300 text-base">
            Já possui uma conta?
          </Text>
          <Button
            mode="outline"
            iconName="arrow-forward"
            onPress={() => router.push("/(auth)/login")}
          >
            Acessar
          </Button>
        </View>
      </View>
    </>
  );
}
