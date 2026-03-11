import { IUser } from "./user-interface";

/* Resposta da api */
export interface IAuthenticateResponse {
  user: IUser;
  token: string;
}