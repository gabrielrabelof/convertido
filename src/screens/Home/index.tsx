import { View, Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export function Home() {
  return (
    <SafeAreaView className="flex-1 bg-orange-100">
      <View className="h-2/5 bg-orange-100 p-3">
        <Text className="font-inter-bold text-3xl text-zinc-800">
          Convertido
        </Text>
      </View>

      <View className="h-3/5 bg-orange-50 p-3"></View>
    </SafeAreaView>
  );
}
