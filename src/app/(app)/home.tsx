import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransactionContext } from "@/context/transaction.context";
import useErrorHandler from "@/shared/hooks/useErrorHandler";
import { FlatList } from "react-native";
import { ListHeader } from "@/components/ListHeader";
import { TransactionListCard } from "@/components/TransactionListCard";

export default function Home() { 
  const {fetchCategories, fetchTransactions, transactions} = useTransactionContext();
  const {handleError} = useErrorHandler();
  const handleFetchCategories = async () => {
    try{
      await fetchCategories();
    } catch(error) {
      handleError(error, "Falha ao buscar as categorias");
    }
  }
/* Busca as categorias ao entrar na home */
  useEffect(() => { 
    (async () => {
 /* promise all para executar as duas funções ao mesmo tempo */
      await Promise.all([handleFetchCategories(), fetchTransactions()]);
    })() 
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
      className="bg-background-secondary"
      data={transactions}
      keyExtractor={(id) => `transaction-${id}`}
      ListHeaderComponent={<ListHeader/>}
      renderItem={({item}) => <TransactionListCard transaction={item} />}
      />
    </SafeAreaView>
  )
}