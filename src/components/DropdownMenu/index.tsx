import { useState } from "react";

import { TouchableOpacity, Text, FlatList } from "react-native";

import { ChevronDown } from "lucide-react-native";
import { colors } from "@styles/colors";

type Option = {
  option: string;
  tag: string;
};

type Props = {
  items: Option[];
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
};

export function DropdownMenu({
  items,
  selectedOption,
  setSelectedOption,
}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleDropdownMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleSelectOption(option: Option) {
    setSelectedOption(option.tag);
    setIsMenuOpen(false);
  }

  return (
    <>
      <TouchableOpacity
        onPress={handleDropdownMenu}
        activeOpacity={0.6}
        className="flex-row items-center gap-1"
      >
        <Text className="font-inter-bold text-base text-stone-700">
          {selectedOption}
        </Text>
        <ChevronDown size={16} color={colors.stone[700]} strokeWidth={2.5} />
      </TouchableOpacity>

      {isMenuOpen && (
        <FlatList
          data={items}
          keyExtractor={(item) => item.tag}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectOption(item)}
              className="flex-1 flex-row items-center justify-between px-2 pb-5"
            >
              <Text className="font-inter-bold text-sm text-stone-700">
                {item.tag}
              </Text>
              <Text className="font-inter-medium text-xxs text-stone-400">
                {item.option}
              </Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          className="absolute -right-5 top-10 z-10 h-28 w-24 rounded-xl border border-stone-400 bg-stone-50 py-1"
        />
      )}
    </>
  );
}
