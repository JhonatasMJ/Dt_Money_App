import { router } from "expo-router"
import { View, Text, TouchableOpacity } from "react-native"

export default function Login() {
  return (
    <View className="bg-green-200 flex-1 justify-center items-center">
      <Text>Login</Text>
      <TouchableOpacity onPress={() => router.navigate('/register')} className="bg-green-500 px-4 py-2 rounded-md mt-4">
        <Text className="text-white">Go to Register</Text>
      </TouchableOpacity>
    </View>
  )
}