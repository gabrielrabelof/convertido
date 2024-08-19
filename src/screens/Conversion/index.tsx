import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { ChevronLeft, ArrowDownUp, Weight } from "lucide-react-native";

import { colors } from "@styles/colors";

import { DropdownMenu } from "@components/DropdownMenu";
import { InfoCard } from "@components/InfoCard";

export function Conversion() {
  const options = [
    { option: "gramas", tag: "g" },
    { option: "quilos", tag: "kg" },
    { option: "toneladas", tag: "t" },
  ];

  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(options[1].tag);
  const [isSwapped, setIsSwapped] = useState(false);

  function handleSwapInputs() {
    setIsSwapped(!isSwapped);
    setInputValue("");
  }

  return (
    <SafeAreaView className="h-full bg-orange-100">
      <View className="h-screen bg-orange-100 p-3.5">
        <View className="mb-4 flex-row items-center gap-4">
          <TouchableOpacity activeOpacity={0.6}>
            <ChevronLeft size={28} color={colors.stone[800]} />
          </TouchableOpacity>
          <Text className="font-inter-bold text-xl text-stone-800">
            Conversor de Medidas
          </Text>
        </View>

        <View className="mx-3 mb-6 mt-3 flex-1 rounded-3xl bg-stone-50 px-7 py-5 shadow-md shadow-black">
          <Text className="font-inter-semibold text-base text-stone-700">
            Talento
          </Text>
          <View className="my-2 w-full flex-row items-center justify-between rounded-lg border border-stone-300">
            <TextInput
              placeholder="Inserir valor"
              keyboardType="numeric"
              className="flex-1 p-2.5 font-inter-regular text-sm"
              maxLength={15}
              value={inputValue}
              onChangeText={setInputValue}
            />

            <View className="w-1/4 items-center border-l border-stone-300">
              {isSwapped ? (
                <Weight size={22} color={colors.stone[700]} />
              ) : (
                <DropdownMenu
                  items={options}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
              )}
            </View>
          </View>
          <Text className="font-inter-medium text-xxs text-stone-400">
            {isSwapped ? "1 Talento ≅ 34,2kg" : "34,2kg ≅ 1 Talento"}
          </Text>

          <TouchableOpacity
            className="my-4 self-center"
            onPress={handleSwapInputs}
          >
            <ArrowDownUp size={28} color={colors.stone[800]} />
          </TouchableOpacity>

          <View className="-z-10 w-full flex-row items-center justify-between rounded-lg border border-stone-300 bg-stone-100">
            <TextInput
              placeholder="Resultado"
              placeholderTextColor={"#d1d2d2"}
              keyboardType="numeric"
              className="flex-1 p-2.5 font-inter-regular text-sm"
              editable={false}
            />

            <View className="w-1/4 items-center border-l border-stone-300">
              {isSwapped ? (
                <DropdownMenu
                  items={options}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
              ) : (
                <Weight size={22} color={colors.stone[700]} />
              )}
            </View>
          </View>

          <Text className="mb-3 mt-6 font-inter-semibold text-base text-stone-700">
            Resultado
          </Text>
          <View className="w-3/4 flex-1 gap-3">
            <Text className="font-inter-medium text-xs text-stone-500">
              150kg equivalem a aproximadamente 4,38 talentos.
            </Text>
            <Text className="font-inter-medium text-xs text-stone-500">
              150kg ≅ 4,38 talentos.
            </Text>
          </View>

          <View className="mb-3 self-center">
            <InfoCard info="Em Apocalipse 16:21, João viu pedras do  caindo do céu com o peso de 1 talento, que são aproximadamente 35 quilos." />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
