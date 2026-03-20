import { Resolver, useForm } from "react-hook-form";
import { formLoginParams } from "@/types/LoginParams";
import { Input } from "../Input";
import Button from "../Button";
import { ActivityIndicator, Text, View } from "react-native";
import { router } from "expo-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schemas/loginSchema";
import { useAuthContext } from "@/context/auth.context";
import useErrorHandler from "@/shared/hooks/useErrorHandler";
import { colors } from "@/shared/colors";

export function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<formLoginParams>({
     defaultValues: {
      email: '',
      password: '',
     },
     resolver: yupResolver(loginSchema) as Resolver<formLoginParams>,
  });

  const {handleAuthenticate} = useAuthContext();
  const {handleError} = useErrorHandler();


  const onSubmit = async (userData: formLoginParams) => {
    try {
      await handleAuthenticate(userData);
    } catch (error) { 
      /* Verifica se o erro foi do tipo AppError, se for vai usar meu componente de snackbar, o handle error é um hook que pega a mensagem e exibe na snackbar */
      handleError(error, 'Falha ao logar')
    } 
  }
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
    <Button iconName="arrow-forward" onPress={handleSubmit(onSubmit)}>
      {isSubmitting ? <ActivityIndicator color={colors.white}/> : 'Entrar'}
    </Button>
    <View>
      <Text className="mb-6 text-gray-300 text-base">Ainda não possui uma conta?</Text>
      <Button mode="outline" iconName="arrow-forward" onPress={ () => router.push('/register')}>
      Cadastrar
    </Button>
    </View>
    </View>
 
  </>;
}
