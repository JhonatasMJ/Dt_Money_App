import { TotalTransactions } from "../total-transaction";
import { Transaction } from "../transaction";

export interface Pagination {
  page: number;
  perPage: number;
  totalRows?: number;
}

export interface GetTransactionRequest {
  page: number;
  perPage: number;
  searchText?: string;
  from?: Date;
  to?: Date;
  typeId?: number;
  categoryId?: number;
}

export interface GetTransactionResponse {
  data: Transaction[];
  totalRows: 0;
  totalPages: 0;
  page: 0;
  perPage: 0;
  totalTransactions: TotalTransactions;
}
