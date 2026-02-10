import '../styles/global.css'
import { Slot, Redirect, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, View } from 'react-native'
import { useEffect, useState } from 'react'

export default function RootLayout() {
  const [user, setUser] = useState<null | object>(null)
  const [loading, setLoading] = useState(true)
  const segments = useSegments()

  useEffect(() => {
    setTimeout(() => {
      setUser(null) 
      setLoading(false)
    }, 1000)
  }, [])

  const isAuthGroup = segments[0] === '(auth)'

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-brand-primary">
        <ActivityIndicator />
      </View>
    )
  }

  if (!user && !isAuthGroup) {
    return <Redirect href="/login" />
  }

  return (
    <SafeAreaView className="flex-1 bg-brand-primary">
      <StatusBar style="dark" />
      <Slot />
    </SafeAreaView>
  )
}
