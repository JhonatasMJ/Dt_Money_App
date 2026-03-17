import { formLoginParams } from "@/types/LoginParams";
import { dtMoneyApi } from "../api/dt-money";
import { IAuthenticateResponse } from "../interfaces/https/authenticate-response";
import { formRegisterParams } from "@/types/RegisterParams";

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


export const registerUser = async (userData: formRegisterParams): Promise<IAuthenticateResponse> => {
  const {data} = await dtMoneyApi.post<IAuthenticateResponse>("/auth/register", userData);

  return data;
}