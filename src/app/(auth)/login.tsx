import { Text, View, TextInput } from "react-native";
import { DismissKeyboardView } from "../../components/DismissKeyboardView";

export default function Login () {
  return (
    <DismissKeyboardView>
      <TextInput className="bg-gray-500 w-full" />
      <Text>login</Text>
    </DismissKeyboardView>
  )
}