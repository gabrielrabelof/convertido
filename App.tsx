import { StatusBar } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import { Home } from "@screens/Home";
import { Conversion } from "@screens/Conversion";

import { Loading } from "@components/Loading";
import React from "react";

export default function App() {
  const [isLoaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!isLoaded || error) {
    return <Loading />;
  }

  return (
    <>
      <Conversion />
      <StatusBar
        backgroundColor="transparent"
        barStyle={"dark-content"}
        translucent
      />
    </>
  );
}
