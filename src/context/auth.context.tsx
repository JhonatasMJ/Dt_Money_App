import { AuthContextType } from "@/types/AuthContext";
import { formLoginParams } from "@/types/LoginParams";
import { formRegisterParams } from "@/types/RegisterParams";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
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

  const handleAuthenticate = useCallback(async (userData: formLoginParams) => {
    const { token, user } = await authService.authenticate(userData);
    await AsyncStorage.setItem("dt-money-user", JSON.stringify({ user, token }));
    setUser(user);
    setToken(token);
  }, []);

  const handleRegister = useCallback(async (formData: formRegisterParams) => {
    const { token, user } = await authService.registerUser(formData);
    await AsyncStorage.setItem("dt-money-user", JSON.stringify({ user, token }));
    setUser(user);
    setToken(token);
  }, []);

  const handleLogout = useCallback(async () => {
    await AsyncStorage.clear();
    setToken(null);
    setUser(null);
  }, []);

  const restoreUserSession = useCallback(async () => {
    const userData = await AsyncStorage.getItem("dt-money-user");
    if (userData) {
      const { user, token } = JSON.parse(userData) as IAuthenticateResponse;
      setUser(user);
      setToken(token);
    }
    return userData;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, handleAuthenticate, handleRegister, handleLogout, restoreUserSession }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (
    context.handleLogout === undefined ||
    context.restoreUserSession === undefined
  ) {
    throw new Error("useAuthContext deve ser usado dentro de AuthContextProvider.");
  }
  return context;
};