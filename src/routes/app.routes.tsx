import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "@screens/Home";
import { LearnMore } from "@screens/LeanMore";
import { Conversion } from "@screens/Conversion";
import { Search } from "@screens/Search";

const { Screen, Navigator } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="learn" component={LearnMore} />
      <Screen name="conversion" component={Conversion} />
      <Screen name="search" component={Search} />
    </Navigator>
  );
}
