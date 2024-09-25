import { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";

import { ArrowLeft, CircleX, SearchX } from "lucide-react-native";

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

  function handleConversion(unit: string, type: string) {
    navigation.navigate("conversion", { unit, type });
  }

  function handleUnitDisabled() {
    Alert.alert(
      "Unidade indisponível",
      "As conversões para unidades de tempo ainda estão em desenvolvimento.",
    );
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
        <View className="mt-3 flex-row items-center justify-between rounded-2xl border border-stone-300 bg-stone-50 p-3 px-4">
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
        filteredUnits.length > 0 ? (
          <FlatList
            data={filteredUnits}
            keyExtractor={(item) => `${item.type}-${item.unit}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  item.type === "Tempo"
                    ? handleUnitDisabled()
                    : handleConversion(item.unit, item.type)
                }
              >
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
          <View className="flex-1 items-center justify-center px-10">
            <SearchX size={32} color={colors.stone[700]} />
            <Text className="mb-1 mt-3 font-inter-semibold text-lg text-stone-700">
              Nenhum resultado de pesquisa
            </Text>
            <Text className="text-center font-inter-regular text-sm text-stone-500">
              Não foi possível encontrar a unidade ou tipo que você está
              procurando
            </Text>
          </View>
        )
      ) : (
        <View className="mt-2 p-3">
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
            <RedirectButton title="Estáter" />
            <RedirectButton title="Jeira" />
            <RedirectButton title="Gômer" />
            <RedirectButton title="Him" />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
