import { Control, FieldValues, Path } from "react-hook-form";
import { TextInputProps } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export interface InputParams<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  leftIconName?: keyof typeof MaterialIcons.glyphMap;
  label?: string;
}