import { BottomSheetContextType } from "@/types/BottomSheet";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
  
} from "react";
import BottomSheet, {
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { View } from "react-native";
import { colors } from "@/shared/colors";
import { TouchableWithoutFeedback } from "react-native";
export const BottomSheetContext = createContext({} as BottomSheetContextType);

export const BottomSheetProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<ReactNode | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["70%", "90%"];
  const [index, setIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const openBottomSheet = useCallback(
    (newContent: ReactNode, index: number) => {
      setIndex(index);
      setContent(newContent);
      setIsOpen(true);
      requestAnimationFrame(() => {
        bottomSheetRef.current?.snapToIndex(index);
      });
    },
    [],
  );

  const closeBottomSheet = useCallback(() => {
    setIsOpen(false);
    setContent(null);
    setIndex(-1);
    bottomSheetRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setIsOpen(false);
    }
  }, []);

  return (
    <BottomSheetContext.Provider
      value={{
        openBottomSheet,
        closeBottomSheet,
      }}
    >
      {children}

      {isOpen && (
        <TouchableWithoutFeedback  onPress={closeBottomSheet}>
          <View className="absolute inset-0 bg-black/70 z-1" />
        </TouchableWithoutFeedback>
      )}

      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        style={{ zIndex: 2 }}
        index={index}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: colors['background-secondary'],
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          elevation: 9,
         }}
      >
        <BottomSheetScrollView>{content}</BottomSheetScrollView>
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
};


export const useBottomSheetContext = () => { 
  return useContext(BottomSheetContext);
}