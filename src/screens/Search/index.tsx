import { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";

import { ArrowLeft, CircleX } from "lucide-react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { colors } from "@styles/colors";

import { typesOfMeasure } from "@utils/typesOfMeasure";

import { RedirectButton } from "@components/RedirectButton";

export function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  const inputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  function handleBack() {
    navigation.navigate("home");
  }

  function handleConversion() {
    navigation.navigate("conversion", { unit: "Talento" });
  }

  function clearInput() {
    setSearchQuery("");
  }

  function normalizeText(text: string) {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  const normalizedSearchQuery = normalizeText(searchQuery);

  const filteredUnits = typesOfMeasure
    .flatMap((item) =>
      item.units.map((unit) => ({
        type: item.type,
        unit,
      })),
    )
    .filter(
      ({ type, unit }) =>
        normalizeText(type).includes(normalizedSearchQuery) ||
        normalizeText(unit).includes(normalizedSearchQuery),
    );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-orange-100">
      <View className="p-3">
        <TouchableOpacity onPress={handleBack} className="h-7 w-7">
          <ArrowLeft size={24} color={colors.stone[800]} />
        </TouchableOpacity>
        <View className="mt-4 flex-row items-center justify-between rounded-2xl border border-stone-300 bg-stone-50 p-3 px-4">
          <TextInput
            ref={inputRef}
            placeholder="Pesquise por unidades ou tipos"
            className="flex-1 font-inter-medium text-zinc-600"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery && (
            <TouchableOpacity onPress={clearInput}>
              <CircleX size={20} color={colors.stone[700]} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {searchQuery ? (
        <FlatList
          data={filteredUnits}
          keyExtractor={(item) => `${item.type}-${item.unit}`}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={handleConversion}>
              <View className="p-4">
                <Text className="font-inter-semibold text-base text-zinc-800">
                  {item.unit}
                </Text>
                <Text className="font-inter-semibold text-orange-900">
                  {item.type}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View className="mt-3 p-3">
          <Text className="font-inter-semibold text-lg text-stone-800">
            Pesquisas Populares
          </Text>
          <View className="mt-4 flex-row flex-wrap">
            <RedirectButton title="Côvado" />
            <RedirectButton title="Estádio" />
            <RedirectButton title="Milha" />
            <RedirectButton title="Siclo" />
            <RedirectButton title="Talento" />
            <RedirectButton title="Denário" />
            <RedirectButton title="Dracma" />
            <RedirectButton title="Horas" />
            <RedirectButton title="Jeira" />
            <RedirectButton title="Gômer" />
            <RedirectButton title="Him" />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
