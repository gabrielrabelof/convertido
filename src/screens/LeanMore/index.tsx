import { View, TouchableOpacity, Text, ScrollView } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { openURL } from "expo-linking";

import {
  ChevronLeft,
  BadgeInfo,
  BookType,
  LibraryBig,
  HeartHandshake,
  Mail,
  BookMarked,
} from "lucide-react-native";

import { colors } from "@styles/colors";

import { TopicIcon } from "@components/TopicIcon";
import { InfoTopic } from "@components/InfoTopic";
import React from "react";

export function LearnMore() {
  const navigation = useNavigation();

  function handleHome() {
    navigation.navigate("home");
  }

  return (
    <SafeAreaView className="flex-1 bg-orange-100">
      <ScrollView>
        <View className="flex-1 gap-5 px-6 py-4">
          <View className="rounded-2xl bg-stone-50 px-3 py-4 shadow-md shadow-black">
            <View className="mb-6 flex-row items-center justify-between">
              <View className="flex-row gap-3">
                <TouchableOpacity onPress={handleHome} activeOpacity={0.6}>
                  <ChevronLeft size={28} color={colors.stone[800]} />
                </TouchableOpacity>
                <Text className="font-inter-bold text-xl text-stone-800">
                  Saiba Mais
                </Text>
              </View>

              <BadgeInfo size={24} color={colors.stone[800]} />
            </View>

            <View>
              <InfoTopic
                icon={
                  <TopicIcon
                    icon={<BookType size={22} color={colors.stone[700]} />}
                    bgColor={colors.stone.white}
                  />
                }
                title="Base de Dados"
                subtitle="As medidas de referência foram coletadas do seguinte site:"
                children={
                  <TouchableOpacity
                    onPress={() =>
                      openURL(
                        "https://estiloadoracao.com/pesos-e-medidas-biblicas/",
                      )
                    }
                  >
                    <Text
                      numberOfLines={1}
                      className="font-inter-regular text-xs text-blue-500"
                    >
                      https://estiloadoracao.com/pesos-e-medidas-biblicas/
                    </Text>
                  </TouchableOpacity>
                }
              />

              <InfoTopic
                icon={
                  <TopicIcon
                    icon={<LibraryBig size={22} color={colors.stone[700]} />}
                    bgColor={colors.stone.white}
                  />
                }
                title="Unidades de Medida"
                subtitle="Todos os valores são aproximados. Muitas medidas variam conforme a época e a localização."
              />

              <InfoTopic
                icon={
                  <TopicIcon
                    icon={
                      <HeartHandshake size={22} color={colors.stone[700]} />
                    }
                    bgColor={colors.stone.white}
                  />
                }
                title="Apoio e Suporte"
                subtitle="Qualquer dúvida ou sugestão, entre em contato conosco através do email disponibilizado."
              />
            </View>
          </View>

          <View className="rounded-2xl bg-stone-50 px-6 py-4 shadow-md shadow-black">
            <Text className="mb-2 font-inter-bold text-lg text-stone-800">
              Contato
            </Text>
            <View className="flex-row items-center">
              <TopicIcon
                icon={<Mail size={26} color={colors.stone[700]} />}
                bgColor={colors.orange[200]}
                plusSize
              />
              <View className="pl-4">
                <Text className="font-inter-semibold text-base text-stone-700">
                  Convertido App
                </Text>
                <TouchableOpacity
                  onPress={() => openURL("mailto:convertidoapp@gmail.com")}
                >
                  <Text className="font-inter-regular text-xs text-zinc-500 underline">
                    convertidoapp@gmail.com
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="rounded-2xl bg-stone-50 px-6 py-4 shadow-md shadow-black">
            <Text className="mb-2 font-inter-bold text-lg text-stone-800">
              Reflexão
            </Text>
            <View className="items-center justify-center">
              <TopicIcon
                icon={<BookMarked size={26} color={colors.stone.white} />}
                bgColor={colors.amber[950]}
                plusSize
              />
              <Text className="my-1 font-inter-semibold text-base text-stone-700">
                Efésios 4:13
              </Text>
              <Text className="text-center font-inter-regular text-xs text-zinc-500">
                Até que cheguemos{" "}
                <Text className="font-inter-semibold">
                  à medida{"\n"} da estatura
                </Text>{" "}
                completa de Cristo.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
