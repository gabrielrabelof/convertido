import { StatusBar, LogBox } from "react-native";

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import { Route } from "@routes";

import { Loading } from "@components/Loading";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

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
      <Route />
      <StatusBar
        backgroundColor="transparent"
        barStyle={"dark-content"}
        translucent
      />
    </>
  );
}
