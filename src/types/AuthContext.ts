import { IUser } from "@/shared/interfaces/https/user-interface";
import { formLoginParams } from "./LoginParams";
import { formRegisterParams } from "./RegisterParams";


export type AuthContextType = {
  user: IUser | null;
  token: string | null;
  handleAuthenticate: (params: formLoginParams) => Promise<void>;
  handleRegister: (params: formRegisterParams) => Promise<void>;
  handleLogout: () => Promise<void>;
  restoreUserSession: () => Promise<string | null>;
};
