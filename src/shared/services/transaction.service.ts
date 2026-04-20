import { TransactionCategory } from "../interfaces/https/transaction-category-response";
import { dtMoneyApi } from "../api/dt-money";
import { CreateTransactionRequest } from "../interfaces/https/create-transaction-request";


/* Retorna todas as categorias */
export const getTransactionCategories = async (): Promise<TransactionCategory[]> => { 
  const {data} = await dtMoneyApi.get<TransactionCategory[]>("/transaction/categories");
  return data;
}

/* Cria uma transação */
export const createTransaction = async (transaction: CreateTransactionRequest) => {
  await dtMoneyApi.post("/transaction", transaction);
}