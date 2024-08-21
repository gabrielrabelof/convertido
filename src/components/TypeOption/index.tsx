import { TouchableOpacity, Text } from "react-native";

type Props = {
  type: string;
  icon: JSX.Element;
  onPress: (type: string) => void;
};

export function TypeOption({ icon, type, onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className="mr-2 h-20 w-20 items-center justify-center rounded-md border border-stone-300 bg-amber-950 shadow-md shadow-black"
      onPress={() => onPress(type)}
    >
      {icon}
      <Text
        numberOfLines={1}
        className="mt-2 text-center font-inter-semibold text-xs text-white"
      >
        {type}
      </Text>
    </TouchableOpacity>
  );
}
