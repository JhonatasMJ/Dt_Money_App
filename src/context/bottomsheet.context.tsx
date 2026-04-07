import { BottomSheetContextType } from "@/types/BottomSheet";
import React, { createContext, ReactNode, useCallback, useState } from "react";

export const BottomSheetContext = createContext({} as BottomSheetContextType);

export const BottomSheetProvider = ({ children }: { children: ReactNode }) => {

  const [content, setContent] = useState<ReactNode | null >(null);
 
  const openBottomSheet = useCallback((newContent: ReactNode, index: number) => {
    setContent(newContent);
  },
  []
)

const closeBottomSheet =  useCallback(() => {
  setContent(null);
},
[])

  return (
  <BottomSheetContext.Provider value={{
    openBottomSheet,
    closeBottomSheet
  }}>
    {children}
  </BottomSheetContext.Provider>

  )
}