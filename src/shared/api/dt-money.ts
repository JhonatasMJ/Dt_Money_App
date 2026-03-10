import axios from "axios";
import { Platform } from "react-native";

/* No emulador de android não roda localhost, então tem que usar um ip especial */

const baseURL = Platform.select({
  ios: "http://localhost:3001",
  android: "http://10.0.2.2:3001",
});

export const dtMoneyApi = axios.create({
  baseURL
});
