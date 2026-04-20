import { TransactionCategory } from "@/shared/interfaces/https/transaction-category-response";
import { createContext, ReactNode, use, useContext, useState } from "react";
import * as transactionServices from "@/shared/services/transaction.service";
import { CreateTransactionRequest } from "@/shared/interfaces/https/create-transaction-request";


/* Contexto de transações */

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  createTransaction: (transaction: CreateTransactionRequest) => Promise<void>;
  categories: TransactionCategory[];
};

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);

  const fetchCategories = async () => {
    const categoriesResponse = await transactionServices.getTransactionCategories();
    setCategories(categoriesResponse);
  };

  const createTransaction = async (transaction: CreateTransactionRequest) => {
    await transactionServices.createTransaction(transaction);
  }

  return (
    <TransactionContext.Provider
      value={{
        categories,
        fetchCategories,
        createTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};


export const useTransactionContext = () => {
  return useContext(TransactionContext);

}