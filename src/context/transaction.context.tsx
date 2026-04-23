import { TransactionCategory } from "@/shared/interfaces/https/transaction-category-response";
import { createContext, ReactNode, use, useCallback, useContext, useState } from "react";
import * as transactionServices from "@/shared/services/transaction.service";
import { CreateTransactionRequest } from "@/shared/interfaces/https/create-transaction-request";
import { Transaction } from "@/shared/interfaces/transaction";
import { TotalTransactions } from "@/shared/interfaces/total-transaction";


/* Contexto de transações */
export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  createTransaction: (transaction: CreateTransactionRequest) => Promise<void>;
  categories: TransactionCategory[];
  fetchTransactions: () => Promise<void>;
  totalTransactions: TotalTransactions;
};

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalTransactions, setTotalTransactions] = useState<TotalTransactions>({
    revenue: 0,
    expense: 0,
    total: 0,
  })

  const fetchCategories = async () => {
    const categoriesResponse = await transactionServices.getTransactionCategories();
    setCategories(categoriesResponse);
  };

  const createTransaction = async (transaction: CreateTransactionRequest) => {
    await transactionServices.createTransaction(transaction);
  }

  /* Busca todas as transações */
  const fetchTransactions = useCallback(async () => {
    const transactionResponse = await transactionServices.getTransactions({
      page: 1,
      perPage: 10,
    });

    setTransactions(transactionResponse.data);
    setTotalTransactions(transactionResponse.totalTransactions);
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        categories,
        fetchCategories,
        createTransaction,
        fetchTransactions,
        totalTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};


export const useTransactionContext = () => {
  return useContext(TransactionContext);

}