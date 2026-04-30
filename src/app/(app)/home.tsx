import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransactionContext } from "@/context/transaction.context";
import useErrorHandler from "@/shared/hooks/useErrorHandler";
import { FlatList, RefreshControl } from "react-native";
import { ListHeader } from "@/components/ListHeader";
import { TransactionListCard } from "@/components/TransactionListCard";

export default function Home() {
  const {
    fetchCategories,
    fetchTransactions,
    transactions,
    refreshTransactions,
    loadMoreTransactions,
    handleLoadings,
    loadings,
  } = useTransactionContext();
  const { handleError } = useErrorHandler();
  const handleFetchCategories = async () => {
    try {
      handleLoadings({ key: "initial", value: true });
      await fetchCategories();
    } catch (error) {
      handleError(error, "Falha ao buscar as categorias");
    } finally {
      handleLoadings({ key: "initial", value: false });
    }
  };

  const handleFetchInitialTransactions = async () => {
    try {
      handleLoadings({ key: "initial", value: true });
      await fetchTransactions({ page: 1 });
    } catch (error) {
      handleError(error, "Falha ao buscar as transações");
    } finally {
      handleLoadings({ key: "initial", value: false });
    }
  };

  const handleLoadMoreTransactions = async () => {
    try {
      handleLoadings({ key: "loadMore", value: true });
      await loadMoreTransactions();
    } catch (error) {
      handleError(error, "Falha ao carregar novas transações");
    } finally {
      handleLoadings({ key: "loadMore", value: false });
    }
  };

  const handleRefreshTransactions = async () => {
    try {
      handleLoadings({ key: "refresh", value: true });
      await refreshTransactions();
    } catch (error) {
      handleError(error, "Falha ao atualizar as transações");
    } finally {
      handleLoadings({ key: "refresh", value: false });
    }
  };

  /* Busca as categorias ao entrar na home */
  useEffect(() => {
    (async () => {
      /* promise all para executar as duas funções ao mesmo tempo */
      await Promise.all([
        handleFetchCategories(),
        handleFetchInitialTransactions(),
      ]);
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        className="bg-background-secondary"
        data={transactions}
        keyExtractor={(item) => `transaction-${item.id}`}
        ListHeaderComponent={<ListHeader />}
        renderItem={({ item }) => <TransactionListCard transaction={item} />}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={loadings.refresh}
            onRefresh={handleRefreshTransactions}
          />
        }
        onEndReached={handleLoadMoreTransactions}
      />
    </SafeAreaView>
  );
}
