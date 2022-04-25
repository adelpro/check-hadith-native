import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import AppLoading from "expo-app-loading";

import { ScaledSheet } from "react-native-size-matters";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import {
  useFonts,
  Tajawal_300Light,
  Tajawal_400Regular,
  Tajawal_500Medium,
  Tajawal_800ExtraBold,
} from "@expo-google-fonts/tajawal";
import HomeScreen from "./screens/homescreen";
import AboutScreen from "./screens/aboutscreen";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function App() {
  const Drawer = createDrawerNavigator();
  const defaultOptions = ({ navigation, route }) => ({
    headerRight: () => {
      return (
        <>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons
              name={Platform.OS === "android" ? "md-menu" : "ios-menu"}
              size={32}
              color={"#000"}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>

          <Text style={styles.headerRightTiteStyle}>{route.params.title}</Text>
        </>
      );
    },
    drawerContent: () => (
      <Image
        source={require("./assets/adaptive-icon.png")}
        style={((width = 50), (height = 50))}
      />
    ),
    headerStyle: {},
    headerLeftContainerStyle: { display: "none" },
    headerRightContainerStyle: {
      display: "flex",
      flexDirection: "row-reverse",
      justifyContent: "right",
      alignItems: "center",
      marginRight: 10,
    },

    headerTitleStyle: {
      display: "none",
    },

    headerTitleContainerStyle: {
      backgroundColor: "green",
    },
    drawerPosition: "right",
    sceneContainerStyle: {
      flex: 1,
      width: "100%",
    },
  });
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
        <Drawer.Navigator screenOptions={defaultOptions}>
          <Drawer.Screen
            name="Home"
            options={{ title: "الباحث في الحديث" }}
            component={HomeScreen}
            initialParams={{
              font: TajawalFontFamily,
              title: " الباحث في الحديث",
            }}
          />
          <Drawer.Screen
            name="About"
            component={AboutScreen}
            initialParams={{
              font: TajawalFontFamily,
              title: "حول البرنامج",
            }}
          />
        </Drawer.Navigator>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerRightTiteStyle: {
    fontFamily: "Tajawal_500Medium",
    fontSize: 24,
  },
});
