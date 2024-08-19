import { View, Text } from "react-native";

import { Info } from "lucide-react-native";

import { colors } from "@styles/colors";

type Props = {
  info: string;
};

export function InfoCard({ info }: Props) {
  return (
    <View className="rounded-md border border-stone-300 bg-orange-200 p-4">
      <Info size={20} color={colors.stone[700]} strokeWidth={2.5} />

      <Text className="mt-2.5 font-inter-medium text-xs text-stone-500">
        {info}
      </Text>
    </View>
  );
}
