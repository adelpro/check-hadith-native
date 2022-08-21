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
import * as serviceWorkerRegistration from "./src/serviceWorkerRegistration";
import CustomDrawerNavigatorRight from "./components/CustomDrawerNavigatorRight";
import Animation from "./components/Animation";
export default function App() {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ projectId: "626f16dbf0485e0004efca50" }),
  };
  fetch(
    "https://feeder-node-1337.herokuapp.com/feedback/create",
    requestOptions
  )
    .then((res) => res.json())
    .then((res) => console.log(res));
  const [fontsLoaded] = useFonts({
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
        <CustomDrawerNavigatorRight font={TajawalFontFamily} />
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();
