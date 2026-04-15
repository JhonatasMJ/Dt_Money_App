import { Header } from "@/components/Header";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransactionContext } from "@/context/transaction.context";
import useErrorHandler from "@/shared/hooks/useErrorHandler";

export default function Home() { 
  const {fetchCategories} = useTransactionContext();
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
      handleFetchCategories();
    })() 
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <Header/>
    </SafeAreaView>
  )
}