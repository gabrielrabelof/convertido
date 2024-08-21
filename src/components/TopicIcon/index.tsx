import { View } from "react-native";

import clsx from "clsx";

type Props = {
  icon: JSX.Element;
  bgColor: string;
  plusSize?: boolean;
};

export function TopicIcon({ icon, bgColor, plusSize }: Props) {
  return (
    <View
      style={{ backgroundColor: bgColor }}
      className={clsx(
        "items-center justify-center rounded-full border border-stone-300",
        plusSize ? "h-14 w-14" : "h-12 w-12",
      )}
    >
      {icon}
    </View>
  );
}
