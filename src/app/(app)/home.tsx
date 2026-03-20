import { useAuthContext } from "@/context/auth.context";
import { Text, TouchableOpacity, View } from "react-native";

export default function Home() { 
  const {handleLogout} = useAuthContext();
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={handleLogout}>
            <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  )
}