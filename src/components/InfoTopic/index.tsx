import { Text, View } from "react-native";

type Props = {
  icon: JSX.Element;
  title: string;
  subtitle: string;
  children?: JSX.Element;
};

export function InfoTopic({ icon, title, subtitle, children }: Props) {
  return (
    <View className="mb-4 flex-row">
      {icon}
      <View className="w-4/5 pl-4">
        <Text className="mb-1 font-inter-semibold text-base text-zinc-700">
          {title}
        </Text>
        <Text className="font-inter-regular text-xs text-zinc-500">
          {subtitle}
        </Text>
        {children}
      </View>
    </View>
  );
}
