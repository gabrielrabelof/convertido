import { memo, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, CircleHelp } from "lucide-react-native";

import { colors } from "@styles/colors";

import { typesOfMeasure } from "@utils/typesOfMeasure";

import { TypeOption } from "@components/TypeOption";
import { UnitOption } from "@components/UnitOption";

type Unit = string;

type MeasureType = {
  type: string;
  units: Unit[];
  icon: (color: string) => JSX.Element;
};

export function Home() {
  const navigation = useNavigation();
  const measureListRef = useRef<FlatList>(null);

  function handleLearnMore() {
    navigation.navigate("learn");
  }

  function handleSearch() {
    navigation.navigate("search");
  }

  function handleScrollToType(type: string) {
    let index = typesOfMeasure.findIndex((item) => item.type === type);
    if (index !== -1 && measureListRef.current) {
      measureListRef.current.scrollToIndex({ index, animated: true });
    }
  }

  const RenderUnitOption = memo(
    ({ unit, measureType }: { unit: Unit; measureType: string }) => {
      const description =
        measureType === "Tempo"
          ? `Informações sobre ${unit} citadas na bíblia`
          : `Converter de ${unit} para unidades atuais`;

      return <UnitOption unit={unit} description={description} />;
    },
  );
  RenderUnitOption.displayName = "RenderUnitOption";

  const renderTypeItem: ListRenderItem<MeasureType> = ({ item }) => (
    <TypeOption
      icon={item.icon("white")}
      type={item.type}
      onPress={handleScrollToType}
    />
  );

  const renderUnitItem = (measureType: string) => {
    const RenderUnit = ({ item: unit }: { item: Unit }) => (
      <RenderUnitOption unit={unit} measureType={measureType} />
    );

    return RenderUnit;
  };

  const renderMeasureItem: ListRenderItem<MeasureType> = ({ item }) => (
    <>
      <View className="mb-4 mt-3 flex-row items-center justify-between p-3">
        <Text className="font-inter-semibold text-lg text-stone-800">
          {item.type}
        </Text>
        {item.icon(colors.stone[800])}
      </View>
      {item.units && (
        <FlatList
          data={item.units}
          keyExtractor={(unit) => unit}
          renderItem={renderUnitItem(item.type)}
          numColumns={2}
          className="px-1"
        />
      )}
    </>
  );

  return (
    <SafeAreaView className="h-full bg-orange-100">
      <View className="h-60 border-b border-stone-300 bg-orange-100">
        <View className="p-3">
          <View className="flex-row items-center justify-between">
            <Text className="font-inter-bold text-2xl text-zinc-800">
              Convertido
            </Text>

            <TouchableOpacity onPress={handleLearnMore}>
              <CircleHelp
                size={24}
                color={colors.stone[800]}
                strokeWidth={2.25}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleSearch}
            activeOpacity={1}
            className="mt-2 w-full flex-row items-center rounded-2xl border border-stone-300 bg-stone-50 p-3 py-3.5"
          >
            <Search size={22} color={colors.stone[700]} />
            <Text className="ml-3 font-inter-medium text-sm text-zinc-500">
              Pesquise por unidades ou tipos
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-1 gap-1.5">
          <Text className="pl-3 font-inter-semibold text-lg text-stone-800">
            Tipos de Medida
          </Text>

          <FlatList
            data={typesOfMeasure}
            keyExtractor={(item) => item.type}
            renderItem={renderTypeItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
          />
        </View>
      </View>

      <FlatList
        ref={measureListRef}
        data={typesOfMeasure}
        keyExtractor={(item) => item.type}
        renderItem={renderMeasureItem}
        className="bg-orange-50"
        contentContainerStyle={{ paddingBottom: 48 }}
      />
    </SafeAreaView>
  );
}
