import { useEffect, useState } from "react"
import { Keyboard } from "react-native"

export default function useKeyboardVisible() {
 /* Controla quando o teclado vai estar sendo exibido */
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

  useEffect(() => {
    const keyboardShowListener = () => Keyboard.addListener("keyboardDidShow", () => setIsKeyboardVisible(true))

   const keyboardDidHideListener = () => Keyboard.addListener("keyboardDidHide", () => setIsKeyboardVisible(false))

   return () => {
    keyboardShowListener().remove()
    keyboardDidHideListener().remove()
   } 
  },[])

  return isKeyboardVisible;
}