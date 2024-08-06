import { TouchableOpacity, Text } from "react-native";

type Props = {
  type: string;
  icon: JSX.Element;
};

export function TypeOption({ icon, type }: Props) {
  const maxLength = 7;
  const truncatedType =
    type.length > maxLength ? type.substring(0, maxLength) + "..." : type;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className="mr-2 h-20 w-20 items-center justify-center rounded-md border border-stone-300 bg-amber-950 shadow-md shadow-black"
    >
      {icon}
      <Text className="mt-2 text-center font-inter-semibold text-xs text-white">
        {truncatedType}
      </Text>
    </TouchableOpacity>
  );
}
