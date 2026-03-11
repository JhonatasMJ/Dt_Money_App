import { formLoginParams } from "@/types/LoginParams";
import { dtMoneyApi } from "../api/dt-money";
import { IAuthenticateResponse } from "../interfaces/https/authenticate-response";

export const authenticate = async (
  userData: formLoginParams,
): Promise<IAuthenticateResponse> => {
  /* segundo parametro é o body (userData) */
  const { data } = await dtMoneyApi.post<IAuthenticateResponse>(
    "/auth/login",
    userData,
  );

  return data;
};
