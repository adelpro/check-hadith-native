import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { ScaledSheet } from "react-native-size-matters";
import {
  useFonts,
  Tajawal_300Light,
  Tajawal_400Regular,
  Tajawal_500Medium,
  Tajawal_800ExtraBold,
} from "@expo-google-fonts/tajawal";
import DrawerNavigatorRight from "./components/DrawerNavigatorRight";
import CustomDrawerNavigator from "./components/CustomDrawerNavigator";
export default function App() {
  let [fontsLoaded] = useFonts({
    Tajawal_300Light,
    Tajawal_400Regular,
    Tajawal_500Medium,
    Tajawal_800ExtraBold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        {/* <DrawerNavigatorRight font={TajawalFontFamily} /> */}
        <CustomDrawerNavigator font={TajawalFontFamily} />
      </NavigationContainer>
    </>
  );
}
const TajawalFontFamily = ScaledSheet.create({
  ExtraBold: {
    fontFamily: "Tajawal_800ExtraBold",
  },
  Light: {
    fontFamily: "Tajawal_300Light",
  },
  Regular: {
    fontFamily: "Tajawal_400Regular",
  },
  Medium: {
    fontFamily: "Tajawal_500Medium",
  },
});
