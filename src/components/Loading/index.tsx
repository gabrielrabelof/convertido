import { ActivityIndicator, View } from "react-native";

export function Loading() {
  return (
    <View className="flex-1 justify-center bg-orange-100">
      <ActivityIndicator size={"large"} color={"#44403C"} />
    </View>
  );
}
