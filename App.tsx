import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import { Home } from "@screens/Home";

import { Loading } from "@components/Loading";
import { StatusBar } from "react-native";

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
      <Home />
      <StatusBar
        backgroundColor="transparent"
        barStyle={"dark-content"}
        translucent
      />
    </>
  );
}
