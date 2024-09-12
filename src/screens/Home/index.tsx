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

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  interpolateColor,
  withTiming,
  Easing,
} from "react-native-reanimated";

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

  const flash = useSharedValue(0);

  function handleLearnMore() {
    navigation.navigate("learn");
  }

  function handleSearch() {
    navigation.navigate("search");
  }

  function handleFlashAnimation(start: number, end: number) {
    flash.value = withTiming(
      start,
      { duration: 600, easing: Easing.linear },
      (finished) => {
        if (finished) {
          flash.value = withTiming(end, {
            duration: 600,
            easing: Easing.linear,
          });
        }
      },
    );
  }

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      flash.value,
      [0, 1],
      [colors.orange[50], colors.orange[300]],
    ),
    opacity: interpolate(flash.value, [0, 1], [1, 0.35]),
  }));

  function handleScrollToType(type: string) {
    let index = typesOfMeasure.findIndex((item) => item.type === type);

    if (index !== -1 && measureListRef.current) {
      measureListRef.current.scrollToIndex({ index, animated: true });
      handleFlashAnimation(1, 0);
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
      <Animated.View
        className="absolute bottom-0 left-0 right-0 top-0"
        style={animatedStyle}
      />
      <Animated.View className="flex-row items-center justify-between p-3 pb-4 pt-3">
        <Text className="font-inter-semibold text-lg text-stone-800">
          {item.type}
        </Text>
        {item.icon(colors.stone[800])}
      </Animated.View>
      {item.units && (
        <Animated.FlatList
          data={item.units}
          keyExtractor={(unit) => unit}
          renderItem={renderUnitItem(item.type)}
          numColumns={2}
          className="px-1 pb-6"
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
        <View className="flex-1 gap-1">
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
      />
    </SafeAreaView>
  );
}
