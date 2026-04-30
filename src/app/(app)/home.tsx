import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransactionContext } from "@/context/transaction.context";
import useErrorHandler from "@/shared/hooks/useErrorHandler";
import { FlatList, RefreshControl } from "react-native";
import { ListHeader } from "@/components/ListHeader";
import { TransactionListCard } from "@/components/TransactionListCard";

export default function Home() { 
  const {fetchCategories, fetchTransactions, transactions, refreshTransactions, loading, loadMoreTransactions} = useTransactionContext();
  const {handleError} = useErrorHandler();
  const handleFetchCategories = async () => {
    try{
      await fetchCategories();
    } catch(error) {
      handleError(error, "Falha ao buscar as categorias");
    }
  }

  const handleFetchInitialTransactions = async () => { 
    try {
      await fetchTransactions({page: 1});
    } catch(error) {
      handleError(error, "Falha ao buscar as transações");
    }
  }

  const handleLoadMoreTransactions = async () => { 
    try {
      await loadMoreTransactions();
    } catch(error) {
      handleError(error, "Falha ao carregar novas transações");
    }
  }


  const handleRefreshTransactions = async () => { 
    try {
      await refreshTransactions();
    } catch(error) {
      handleError(error, "Falha ao atualizar as transações");
    }
  }

/* Busca as categorias ao entrar na home */
  useEffect(() => { 
    (async () => {
 /* promise all para executar as duas funções ao mesmo tempo */
      await Promise.all([handleFetchCategories(), handleFetchInitialTransactions()]);
    })() 
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
      className="bg-background-secondary"
      data={transactions}
      keyExtractor={(item) => `transaction-${item.id}`}
      ListHeaderComponent={<ListHeader/>}
      renderItem={({item}) => <TransactionListCard transaction={item} />}
      onEndReachedThreshold={0.5}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={handleRefreshTransactions} />}
      onEndReached={handleLoadMoreTransactions}
      />
    </SafeAreaView>
  )
}