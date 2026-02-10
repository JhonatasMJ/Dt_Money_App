import '../styles/global.css'
import { Slot} from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SystemBars } from 'react-native-edge-to-edge'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1 bg-brand-primary">
      <SystemBars style="light" />
      <StatusBar />
      <Slot />
    </SafeAreaView>
  )
}
