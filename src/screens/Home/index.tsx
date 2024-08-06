import React, { memo } from "react";
import { View, Text, TextInput, FlatList, ListRenderItem } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Search } from "lucide-react-native";

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

const RenderTypeOption = memo(({ item }: { item: MeasureType }) => (
  <TypeOption icon={item.icon("white")} type={item.type} />
));
RenderTypeOption.displayName = "RenderTypeOption";

const RenderUnitOption = memo(({ unit }: { unit: Unit }) => (
  <UnitOption
    unit={unit}
    description={`Converter de ${unit} para unidades atuais`}
  />
));
RenderUnitOption.displayName = "RenderUnitOption";

export function Home() {
  const renderTypeItem: ListRenderItem<MeasureType> = ({ item }) => (
    <RenderTypeOption item={item} />
  );

  const renderUnitItem: ListRenderItem<Unit> = ({ item: unit }) => (
    <RenderUnitOption unit={unit} />
  );

  const renderMeasureItem: ListRenderItem<MeasureType> = ({ item }) => (
    <View>
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
          renderItem={renderUnitItem}
          className="flex-row flex-wrap justify-center"
        />
      )}
    </View>
  );

  return (
    <SafeAreaView className="h-full bg-orange-100">
      <View className="h-64 border-b border-stone-300 bg-orange-100">
        <View className="p-3">
          <Text className="font-inter-bold text-3xl text-zinc-800">
            Convertido
          </Text>

          <View className="mb-1 mt-3 w-full flex-row items-center rounded-lg border border-stone-300 bg-stone-50 p-2">
            <Search size={20} color={colors.stone[700]} />
            <TextInput
              placeholder="Pesquisar..."
              className="ml-3 flex-1 font-inter-medium text-sm"
            />
          </View>
        </View>
        <View className="flex-1 gap-2">
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
        data={typesOfMeasure}
        keyExtractor={(item) => item.type}
        renderItem={renderMeasureItem}
        className="bg-orange-50"
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </SafeAreaView>
  );
}
