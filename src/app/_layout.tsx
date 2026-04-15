import { AuthContextProvider } from "@/context/auth.context";
import "../styles/global.css";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SystemBars } from "react-native-edge-to-edge";
import { SafeAreaView } from "react-native-safe-area-context";
import { SnackBarContextProvider } from "@/context/snackbar.context";
import { SnackBar } from "@/components/SnackBar";
import { BottomSheetProvider } from "@/context/bottomSheet.context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TransactionContextProvider } from "@/context/transaction.context";

export default function RootLayout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SnackBarContextProvider>
        <AuthContextProvider>
          <TransactionContextProvider>
            <BottomSheetProvider>
              <SafeAreaView className="flex-1 bg-brand-primary">
                <SystemBars style="light" />
                <StatusBar />
                <Slot />
                <SnackBar />
              </SafeAreaView>
            </BottomSheetProvider>
          </TransactionContextProvider>
        </AuthContextProvider>
      </SnackBarContextProvider>
    </GestureHandlerRootView>
  );
}
