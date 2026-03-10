import { formLoginParams } from "./formLoginParams";
import { formRegisterParams } from "./formRegisterParams";

export type AuthContextType = {
  user: null;
  token: string | null;
  handleAuthenticate: (params: formLoginParams) => Promise<void>;
  handleRegister: (params: formRegisterParams) => Promise<void>;
  handleLogout: () => void;
};
