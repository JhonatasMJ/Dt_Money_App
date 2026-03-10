import { AuthContextType } from "@/types/AuthContext";
import { formLoginParams } from "@/types/LoginParams";
import { formRegisterParams } from "@/types/RegisterParams";
import { createContext, ReactNode, useContext, useState } from "react";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const handleAuthenticate = async ({ email, password }: formLoginParams) => {};

  const handleRegister = async (formData: formRegisterParams) => {};

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