import { TransactionCategory } from "../interfaces/https/transaction-category-response";
import { dtMoneyApi } from "../api/dt-money";
import { CreateTransactionRequest } from "../interfaces/https/create-transaction-request";
import { GetTransactionRequest, GetTransactionResponse } from "../interfaces/https/get-transaction-request";
import qs from 'qs';

/* Retorna todas as categorias */
export const getTransactionCategories = async (): Promise<TransactionCategory[]> => { 
  const {data} = await dtMoneyApi.get<TransactionCategory[]>("/transaction/categories");
  return data;
}

/* Cria uma transação */
export const createTransaction = async (transaction: CreateTransactionRequest) => {
  await dtMoneyApi.post("/transaction", transaction);
}

/* Retorna todas as transações, o qs serve para converter o objeto em uma string de query params, sem o serializer fica "categoryId[]=1" com o serializer fica "categoryId=1" */
export const getTransactions = async (params: GetTransactionRequest): Promise<GetTransactionResponse> => {
  const {data} = await dtMoneyApi.get('/transaction', {
    params,
    paramsSerializer: (p) => qs.stringify(p, { arrayFormat:'repeat'})
  });
  return data;
}

/* Deleta uma transação */
export const deleteTransaction = async (id: number) => {
  await dtMoneyApi.delete(`/transaction/${id}`);
}