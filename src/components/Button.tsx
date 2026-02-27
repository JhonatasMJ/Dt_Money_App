import { ButtonProps } from "@/types/Buton";
import clsx from "clsx";
import { Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";

export default function Button({
  mode = "fill",
  iconName,
  ...rest
}: ButtonProps) {
  const isFill = mode === "fill";

  return (
    <TouchableOpacity
      className={clsx(
        "w-full rounded-lg px-5 flex-row items-center h-button",
        iconName ? "justify-between" : "justify-center",
        {
          "bg-accent-brand": isFill,
          "bg-transparent border border-accent-brand": !isFill,
        },
      )}
      {...rest}
    >
      <Text
        className={clsx("text-base", {
          "text-white": isFill,
          "text-accent-brand": !isFill,
        })}
      >
        {rest.children}
      </Text>
      {
        iconName && (
          <MaterialIcons
            name={iconName}
            size={24}
            color={isFill ? colors.white : colors["accent-brand"]}
          />
        )
      }
    </TouchableOpacity>
  );
}
