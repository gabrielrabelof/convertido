import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  ChevronLeft,
  ArrowDownUp,
  ClipboardList,
  PencilRuler,
} from "lucide-react-native";
import clsx from "clsx";

import { colors } from "@styles/colors";

import { conversionMeasures } from "@utils/conversionMeasures";

import { DropdownMenu } from "@components/DropdownMenu";
import { InfoCard } from "@components/InfoCard";

type RouteParams = {
  type: string;
  unit: string;
};

export function Conversion() {
  const navigation = useNavigation();
  const route = useRoute();
  const { type, unit } = route.params as RouteParams;

  const [options, setOptions] = useState<{ option: string; tag: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [isSwapped, setIsSwapped] = useState(false);
  const [result, setResult] = useState("");
  const [unitFactor, setUnitFactor] = useState(0);
  const [verse, setVerse] = useState("");

  const inputRef = useRef<TextInput>(null);

  const icon = <PencilRuler size={24} color={colors.stone[700]} />;

  function handleHome() {
    navigation.goBack();
  }

  function handleSwapInputs() {
    setIsSwapped(!isSwapped);
    handleConversion(inputValue);
  }

  function getOptionFromSelectedTag(selectedTag: string) {
    const matchingOption = options.find((item) => item.tag === selectedTag);
    return matchingOption ? matchingOption.option : "";
  }

  const updateConversionOptions = useCallback(
    (selectedUnit: string, selectedOption: string) => {
      const matchingUnit = conversionMeasures.find(
        (measure) => measure.unit === selectedUnit,
      );

      if (matchingUnit) {
        const newOptions = matchingUnit.conversions.map((conversion) => ({
          option: conversion.unit,
          tag: conversion.tag,
        }));
        setOptions(newOptions);

        if (newOptions.length > 0) {
          const selectedConversion = matchingUnit.conversions.find(
            (conversion) => conversion.tag === selectedOption,
          );

          if (selectedConversion) {
            const selectedConversionIndex =
              matchingUnit.conversions.indexOf(selectedConversion);

            setSelectedOption(selectedOption);
            setUnitFactor(
              matchingUnit.conversions[selectedConversionIndex].factor,
            );
          } else {
            setSelectedOption(newOptions[0].tag);
            setUnitFactor(matchingUnit.conversions[0].factor);
          }
        }

        setVerse(matchingUnit.verse);
      }
    },
    [],
  );

  function handleInputChange(text: string) {
    if (text !== "" && !/^\d/.test(text)) {
      Alert.alert(
        "Valor Inválido",
        "Não é permitido que o primeiro valor seja diferente de um número. ",
      );

      return;
    }

    setInputValue(text);
    handleConversion(text);
  }

  const handleConversion = useCallback(
    (currentValue: string) => {
      const matchingUnit = conversionMeasures.find(
        (measure) => measure.unit === unit,
      );
      const conversion = matchingUnit?.conversions.find(
        (conv) => conv.tag === selectedOption,
      );

      if (!currentValue) {
        return setResult("");
      }

      const formattedValue = currentValue.replace(",", ".");

      if (conversion) {
        const value = parseFloat(formattedValue);
        let convertedValue;

        if (isSwapped) {
          convertedValue = (value / conversion.factor).toLocaleString("pt-BR");
        } else {
          convertedValue = (value * conversion.factor).toLocaleString("pt-BR");
        }

        setResult(convertedValue);
      }
    },
    [isSwapped, selectedOption, unit],
  );

  useEffect(() => {
    updateConversionOptions(unit, selectedOption);

    if (inputValue) {
      handleConversion(inputValue);
    }
  }, [
    unit,
    selectedOption,
    isSwapped,
    unitFactor,
    inputValue,
    updateConversionOptions,
    handleConversion,
  ]);

  return (
    <TouchableWithoutFeedback onPress={() => inputRef.current?.blur()}>
      <SafeAreaView className="h-full bg-orange-100">
        <View className="h-screen bg-orange-100 p-3.5">
          <View className="mb-4 flex-row items-center gap-4">
            <TouchableOpacity onPress={handleHome} activeOpacity={0.6}>
              <ChevronLeft size={28} color={colors.stone[800]} />
            </TouchableOpacity>
            <Text className="font-inter-bold text-xl text-stone-800">
              Conversor de Medidas
            </Text>
          </View>

          <View className="mx-3 mb-6 mt-3 flex-1 rounded-3xl bg-stone-50 px-7 py-5 shadow-md shadow-black">
            {isSwapped ? (
              <Text className="font-inter-medium text-sm capitalize text-stone-700">
                {getOptionFromSelectedTag(selectedOption)}
              </Text>
            ) : (
              <Text className="font-inter-medium text-sm text-stone-700">
                {unit}
              </Text>
            )}
            <View className="my-2 w-full flex-row items-center justify-between rounded-lg border border-stone-300">
              <TextInput
                ref={inputRef}
                placeholder="Inserir valor"
                keyboardType="decimal-pad"
                className="flex-1 p-2.5 font-inter-regular text-sm"
                maxLength={15}
                value={inputValue}
                onChangeText={(text) => handleInputChange(text)}
              />

              <View className="w-1/4 items-center border-l border-stone-300">
                {isSwapped ? (
                  <DropdownMenu
                    items={options}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                  />
                ) : (
                  icon
                )}
              </View>
            </View>
            <Text className="font-inter-medium text-xxs text-stone-400">
              {type === "Dinheiro" ? (
                <>
                  {isSwapped
                    ? `${selectedOption} ${unitFactor.toLocaleString("pt-BR")} ≅ 1 ${unit}`
                    : `1 ${unit} ≅ ${selectedOption} ${unitFactor.toLocaleString("pt-BR")}`}
                </>
              ) : (
                <>
                  {isSwapped
                    ? `${unitFactor.toLocaleString("pt-BR")} ${selectedOption} ≅ 1 ${unit}`
                    : `1 ${unit} ≅ ${unitFactor.toLocaleString("pt-BR")} ${selectedOption}`}
                </>
              )}
            </Text>

            <TouchableOpacity
              className="my-4 self-center"
              onPress={handleSwapInputs}
            >
              <ArrowDownUp size={28} color={colors.stone[800]} />
            </TouchableOpacity>

            {isSwapped ? (
              <Text className="font-inter-medium text-sm text-stone-700">
                {unit}
              </Text>
            ) : (
              <Text className="font-inter-medium text-sm capitalize text-stone-700">
                {getOptionFromSelectedTag(selectedOption)}
              </Text>
            )}
            <View className="-z-10 my-2 w-full flex-row items-center justify-between rounded-lg border border-stone-300 bg-stone-100">
              <TextInput
                placeholder="Resultado"
                placeholderTextColor={"#d1d2d2"}
                className="flex-1 p-2.5 font-inter-regular text-sm"
                editable={false}
                value={result}
              />

              <View className="w-1/4 items-center border-l border-stone-300">
                {isSwapped ? (
                  icon
                ) : (
                  <DropdownMenu
                    items={options}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                  />
                )}
              </View>
            </View>

            <Text
              className={clsx(
                "mt-4 font-inter-semibold text-base text-stone-700",
                {
                  "mb-3": inputValue,
                },
              )}
            >
              Resultado
            </Text>
            {inputValue ? (
              <>
                {inputValue === "1" ? (
                  <>
                    {isSwapped ? (
                      <View className="flex-1 gap-3 pl-1">
                        <Text className="font-inter-medium text-xs text-stone-500">
                          {type === "Dinheiro" ? (
                            <>
                              {selectedOption}
                              {parseFloat(inputValue.replace(",", "."))
                                .toLocaleString("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                })
                                .replace("R$", "")}{" "}
                              ≅ {result} {unit}.
                            </>
                          ) : (
                            <>
                              {inputValue} {selectedOption} ≅ {result} {unit}.
                            </>
                          )}
                        </Text>
                        <Text className="font-inter-medium text-xs text-stone-500">
                          {type === "Dinheiro" ? (
                            <>
                              {selectedOption}
                              {parseFloat(inputValue.replace(",", "."))
                                .toLocaleString("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                })
                                .replace("R$", "")}{" "}
                              equivale a {"\n"}
                              aproximadamente {result} {unit}.
                            </>
                          ) : (
                            <>
                              {inputValue} {selectedOption} equivale a {"\n"}
                              aproximadamente {result} {unit}.
                            </>
                          )}
                        </Text>
                      </View>
                    ) : (
                      <View className="flex-1 gap-3 pl-1">
                        <Text className="font-inter-medium text-xs text-stone-500">
                          {type === "Dinheiro" ? (
                            <>
                              {inputValue} {unit} ≅ {selectedOption} {result}.
                            </>
                          ) : (
                            <>
                              {inputValue} {unit} ≅ {result} {selectedOption}.
                            </>
                          )}
                        </Text>
                        <Text className="font-inter-medium text-xs text-stone-500">
                          {type === "Dinheiro" ? (
                            <>
                              {inputValue} {unit} equivale a {"\n"}
                              aproximadamente {selectedOption} {result}.
                            </>
                          ) : (
                            <>
                              {inputValue} {unit} equivale a {"\n"}
                              aproximadamente {result} {selectedOption}.
                            </>
                          )}
                        </Text>
                      </View>
                    )}
                  </>
                ) : (
                  <>
                    {isSwapped ? (
                      <View className="flex-1 gap-3 pl-1">
                        <Text className="font-inter-medium text-xs text-stone-500">
                          {type === "Dinheiro" ? (
                            <>
                              {selectedOption}
                              {parseFloat(inputValue.replace(",", "."))
                                .toLocaleString("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                })
                                .replace("R$", "")}{" "}
                              ≅ {result} {unit}.
                            </>
                          ) : (
                            <>
                              {parseFloat(
                                inputValue.replace(",", "."),
                              ).toLocaleString("pt-BR")}{" "}
                              {selectedOption} ≅ {result} {unit}.
                            </>
                          )}
                        </Text>
                        <Text className="font-inter-medium text-xs text-stone-500">
                          {type === "Dinheiro" ? (
                            <>
                              {selectedOption}
                              {parseFloat(inputValue.replace(",", "."))
                                .toLocaleString("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                })
                                .replace("R$", "")}{" "}
                              equivalem a {"\n"}
                              aproximadamente {result} {unit}.
                            </>
                          ) : (
                            <>
                              {parseFloat(
                                inputValue.replace(",", "."),
                              ).toLocaleString("pt-BR")}{" "}
                              {selectedOption} equivalem a {"\n"}
                              aproximadamente {result} {unit}.
                            </>
                          )}
                        </Text>
                      </View>
                    ) : (
                      <View className="-z-50 flex-1 gap-3 pl-1">
                        <Text className="font-inter-medium text-xs text-stone-500">
                          {type === "Dinheiro" ? (
                            <>
                              {parseFloat(
                                inputValue.replace(",", "."),
                              ).toLocaleString("pt-BR")}{" "}
                              {unit} ≅ {selectedOption} {result}.
                            </>
                          ) : (
                            <>
                              {parseFloat(
                                inputValue.replace(",", "."),
                              ).toLocaleString("pt-BR")}{" "}
                              {unit} ≅ {result} {selectedOption}.
                            </>
                          )}
                        </Text>
                        <Text className="font-inter-medium text-xs text-stone-500">
                          {type === "Dinheiro" ? (
                            <>
                              {parseFloat(
                                inputValue.replace(",", "."),
                              ).toLocaleString("pt-BR")}{" "}
                              {unit} equivalem a {"\n"}
                              aproximadamente {selectedOption} {result}.
                            </>
                          ) : (
                            <>
                              {parseFloat(
                                inputValue.replace(",", "."),
                              ).toLocaleString("pt-BR")}{" "}
                              {unit} equivalem a {"\n"}
                              aproximadamente {result} {selectedOption}.
                            </>
                          )}
                        </Text>
                      </View>
                    )}
                  </>
                )}
              </>
            ) : (
              <View className="flex-1 items-center justify-center">
                <ClipboardList size={32} color={colors.stone[400]} />
                <Text className="mt-2 font-inter-regular text-xs text-stone-400">
                  Insira o valor desejado para {"\n"}
                  que seja exibido o resultado.
                </Text>
              </View>
            )}

            <View className="mb-1 self-center">
              <InfoCard info={verse} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
