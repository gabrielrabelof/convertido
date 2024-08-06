import { Text, TouchableOpacity } from "react-native";

import { ArrowUpRight } from "lucide-react-native";

import { colors } from "@styles/colors";

type Props = {
  unit: string;
  description: string;
};

export function UnitOption({ unit, description }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="m-1 h-24 w-44 flex-col justify-between rounded-lg border border-stone-300 bg-orange-200 p-3"
    >
      <ArrowUpRight
        size={20}
        color={colors.stone[700]}
        className="absolute right-1 top-1"
      />
      <Text
        numberOfLines={1}
        className="pr-2.5 font-inter-semibold text-base text-stone-700"
      >
        {unit}
      </Text>
      <Text
        numberOfLines={2}
        className="font-inter-regular text-xs text-stone-700"
      >
        {description}
      </Text>
    </TouchableOpacity>
  );
}
