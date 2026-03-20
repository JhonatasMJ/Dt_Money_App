import { AuthContextType } from "@/types/AuthContext";
import { formLoginParams } from "@/types/LoginParams";
import { formRegisterParams } from "@/types/RegisterParams";
import { createContext, ReactNode, useContext, useState } from "react";
import * as authService from "@/shared/services/auth.service"
import { IUser } from "@/shared/interfaces/https/user-interface";
import  AsyncStorage from "@react-native-async-storage/async-storage";
import { IAuthenticateResponse } from "@/shared/interfaces/https/authenticate-response";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleAuthenticate = async (userData: formLoginParams) => {
    const {token,user} = await authService.authenticate(userData);
    await AsyncStorage.setItem("dt-money-user", JSON.stringify({ user, token }));
    setUser(user);
    setToken(token);

  };

  const handleRegister = async (formData: formRegisterParams) => {
    const {token,user} = await authService.registerUser(formData);
    await AsyncStorage.setItem("dt-money-user", JSON.stringify({ user, token }));
    setUser(user);
    setToken(token);
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    setToken(null);
    setUser(null);
  };

  /* Restaura o user e o token para manter ele logado */
  const restoreUserSession = async () => {
    const userData = await AsyncStorage.getItem("dt-money-user");
    if (userData) {
      const { user, token } = JSON.parse(userData) as IAuthenticateResponse;
      setUser(user);
      setToken(token);
    }
    return userData
  };

  return (
    <AuthContext.Provider
      value={{ user, token, handleAuthenticate, handleRegister, handleLogout, restoreUserSession }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* Contexto de autenticação */
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
}