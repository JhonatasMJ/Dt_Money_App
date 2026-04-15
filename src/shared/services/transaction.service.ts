import { TransactionCategory } from "../interfaces/https/transaction-category-response";
import { dtMoneyApi } from "../api/dt-money";


/* Retorna todas as categorias */
export const getTransactionCategories = async (): Promise<TransactionCategory[]> => { 
  const {data} = await dtMoneyApi.get<TransactionCategory[]>("/transaction-categories");
  return data;
}