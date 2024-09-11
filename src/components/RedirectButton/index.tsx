import { Text, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

type Props = {
  title: string;
};

export function RedirectButton({ title }: Props) {
  const navigation = useNavigation();

  function handleConversion() {
    navigation.navigate("conversion", { unit: title });
  }

  return (
    <TouchableOpacity
      onPress={handleConversion}
      className="mb-3.5 mr-2.5 rounded-lg border border-zinc-200 bg-orange-200 px-4 py-1.5"
    >
      <Text className="font-inter-semibold text-sm text-zinc-700">{title}</Text>
    </TouchableOpacity>
  );
}
