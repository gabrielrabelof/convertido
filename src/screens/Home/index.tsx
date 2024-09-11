import { memo, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, CircleHelp } from "lucide-react-native";

import clsx from "clsx";

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

const RenderUnitOption = memo(({ unit }: { unit: Unit }) => (
  <UnitOption
    unit={unit}
    description={`Converter de ${unit} para unidades atuais`}
  />
));
RenderUnitOption.displayName = "RenderUnitOption";

export function Home() {
  const navigation = useNavigation();
  const measureListRef = useRef<FlatList>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [flashType, setFlashType] = useState<string | null>(null);

  function handleLearnMore() {
    navigation.navigate("learn");
  }

  function handleScrollToType(type: string) {
    let index = typesOfMeasure.findIndex((item) => item.type === type);
    if (index !== -1 && measureListRef.current) {
      measureListRef.current.scrollToIndex({ index, animated: true });

      if (selectedType === type) {
        setFlashType(type);
        setTimeout(() => setFlashType(null), 500);
      }
      setSelectedType(type);
    }
  }

  const renderTypeItem: ListRenderItem<MeasureType> = ({ item }) => (
    <TypeOption
      icon={item.icon("white")}
      type={item.type}
      onPress={handleScrollToType}
    />
  );

  const renderUnitItem: ListRenderItem<Unit> = ({ item: unit }) => (
    <RenderUnitOption unit={unit} />
  );

  const renderMeasureItem: ListRenderItem<MeasureType> = ({ item }) => (
    <>
      <View
        className={clsx("flex-row items-center justify-between p-3 pb-4 pt-3", {
          "bg-orange-100 opacity-75": flashType === item.type,
        })}
      >
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
          numColumns={2}
          className={clsx("px-1", {
            "bg-orange-100 opacity-90": flashType === item.type,
          })}
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

          <View className="mt-2 w-full flex-row items-center rounded-2xl border border-stone-300 bg-stone-50 p-2">
            <Search size={20} color={colors.stone[700]} />
            <TextInput
              placeholder="Pesquisar..."
              className="ml-3 flex-1 font-inter-medium text-sm"
            />
          </View>
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
