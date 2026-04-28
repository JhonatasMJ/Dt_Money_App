import { TransactionCategory } from "@/shared/interfaces/https/transaction-category-response";
import { createContext, ReactNode, use, useCallback, useContext, useState } from "react";
import * as transactionServices from "@/shared/services/transaction.service";
import { CreateTransactionRequest } from "@/shared/interfaces/https/create-transaction-request";
import { Transaction } from "@/shared/interfaces/transaction";
import { TotalTransactions } from "@/shared/interfaces/total-transaction";
import { UpdateTransactionRequest } from "@/shared/interfaces/https/update-transaction-request";


/* Contexto de transações */
export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  createTransaction: (transaction: CreateTransactionRequest) => Promise<void>;
  updateTransaction: (transaction: UpdateTransactionRequest) => Promise<void>;
  categories: TransactionCategory[];
  fetchTransactions: () => Promise<void>;
  totalTransactions: TotalTransactions;
  transactions: Transaction[];
  refreshTransactions: () => Promise<void>;
  loading: boolean;
};

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
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
    await refreshTransactions();
  }

  const updateTransaction = async (transaction: UpdateTransactionRequest) => {
    await transactionServices.updateTransaction(transaction);
    await refreshTransactions();
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

  const refreshTransactions =  async () => {
    setLoading(true);
    const transactionResponse = await transactionServices.getTransactions({
      page: 1,
      perPage: 10,
    });
    setTransactions(transactionResponse.data);
    setTotalTransactions(transactionResponse.totalTransactions);
    setLoading(false);
  }

  return (
    <TransactionContext.Provider
      value={{
        categories,
        fetchCategories,
        createTransaction,
        updateTransaction,
        fetchTransactions,
        totalTransactions,
        transactions,
        refreshTransactions,
        loading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};


export const useTransactionContext = () => {
  return useContext(TransactionContext);

}