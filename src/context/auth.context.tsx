import { AuthContextType } from "@/types/AuthContext";
import { formLoginParams } from "@/types/LoginParams";
import { formRegisterParams } from "@/types/RegisterParams";
import { createContext, ReactNode, useContext, useState } from "react";
import * as authService from "@/shared/services/auth.service"
import { IUser } from "@/shared/interfaces/https/user-interface";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleAuthenticate = async (userData: formLoginParams) => {
    const {token,user} = await authService.authenticate(userData);
    console.log(token, user);
    setUser(user);
    setToken(token);

  };

  const handleRegister = async (formData: formRegisterParams) => {
    const {token,user} = await authService.registerUser(formData);
    setUser(user);
    setToken(token);
  };

  const handleLogout = () => {};

  return (
    <AuthContext.Provider
      value={{ user, token, handleAuthenticate, handleRegister, handleLogout }}
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