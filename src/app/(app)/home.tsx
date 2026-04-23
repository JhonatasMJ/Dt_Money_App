import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransactionContext } from "@/context/transaction.context";
import useErrorHandler from "@/shared/hooks/useErrorHandler";
import { FlatList } from "react-native";
import { ListHeader } from "@/components/ListHeader";

export default function Home() { 
  const {fetchCategories, fetchTransactions} = useTransactionContext();
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
      await handleFetchCategories();
      await fetchTransactions();
    })() 
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-background-secondary">
      <FlatList
      data={[]}
      ListHeaderComponent={<ListHeader/>}
      renderItem={() => <></>}
      />
    </SafeAreaView>
  )
}