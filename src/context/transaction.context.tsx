import { TransactionCategory } from "@/shared/interfaces/https/transaction-category-response";
import {
  createContext,
  ReactNode,
  use,
  useCallback,
  useContext,
  useState,
} from "react";
import * as transactionServices from "@/shared/services/transaction.service";
import { CreateTransactionRequest } from "@/shared/interfaces/https/create-transaction-request";
import { Transaction } from "@/shared/interfaces/transaction";
import { TotalTransactions } from "@/shared/interfaces/total-transaction";
import { UpdateTransactionRequest } from "@/shared/interfaces/https/update-transaction-request";
import { Pagination } from "@/shared/interfaces/https/get-transaction-request";

interface FetchTransactionsParams {
  page: number;
}

/* Contexto de transações */
export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  createTransaction: (transaction: CreateTransactionRequest) => Promise<void>;
  updateTransaction: (transaction: UpdateTransactionRequest) => Promise<void>;
  categories: TransactionCategory[];
  fetchTransactions: (params: FetchTransactionsParams) => Promise<void>;
  totalTransactions: TotalTransactions;
  transactions: Transaction[];
  refreshTransactions: () => Promise<void>;
  loading: boolean;
  loadMoreTransactions: () => Promise<void>;
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
  const [totalTransactions, setTotalTransactions] = useState<TotalTransactions>(
    {
      revenue: 0,
      expense: 0,
      total: 0,
    },
  );

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 15,
    totalRows: 0,
    totalPages: 0,
  });

  const fetchCategories = async () => {
    const categoriesResponse =
      await transactionServices.getTransactionCategories();
    setCategories(categoriesResponse);
  };

  const createTransaction = async (transaction: CreateTransactionRequest) => {
    await transactionServices.createTransaction(transaction);
    await refreshTransactions();
  };

  const updateTransaction = async (transaction: UpdateTransactionRequest) => {
    await transactionServices.updateTransaction(transaction);
    await refreshTransactions();
  };

  /* Busca todas as transações */
  const fetchTransactions = useCallback(
    async ({ page = 1 }: FetchTransactionsParams) => {
      setLoading(true);
      const transactionResponse = await transactionServices.getTransactions({
        page,
        perPage: pagination.perPage,
      });

      if (page === 1) {
        setTransactions(transactionResponse.data);
      } else {
        setTransactions((prevState) => [
          ...prevState,
          ...transactionResponse.data,
        ]);
      }

      setTotalTransactions(transactionResponse.totalTransactions);
      setPagination({
        ...pagination,
        page,
        totalRows: transactionResponse.totalRows,
        totalPages: transactionResponse.totalPages,
      });
      setLoading(false);
    },
    [pagination],
  );

  const refreshTransactions = useCallback(async () => {
    const { page, perPage } = pagination;

    setLoading(true);
    const transactionResponse = await transactionServices.getTransactions({
      page: 1,
      perPage: page * perPage,
    });
    setTransactions(transactionResponse.data);
    setTotalTransactions(transactionResponse.totalTransactions);
    setPagination({
      ...pagination,
      page,
      totalPages: transactionResponse.totalPages,
      totalRows: transactionResponse.totalRows,
    });
    setLoading(false);
  }, [pagination]);

  const loadMoreTransactions = useCallback(async () => {
    if (loading || pagination.page >= pagination.totalPages) return;
    fetchTransactions({ page: pagination.page + 1 });
  }, [loading, pagination]);

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
        loadMoreTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
