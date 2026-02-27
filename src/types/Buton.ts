import { TouchableOpacityProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type ButtonMode = 'fill' | 'outline' ;

export interface ButtonProps extends TouchableOpacityProps {
  mode?: ButtonMode;
  iconName?: keyof typeof MaterialIcons.glyphMap;
}