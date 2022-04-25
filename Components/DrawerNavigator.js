import Ionicons from "@expo/vector-icons/Ionicons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Platform, TouchableOpacity, Text, Image } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
export default function DrawerNavigator(font) {
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
  return (
    <Drawer.Navigator screenOptions={defaultOptions}>
      <Drawer.Screen
        name="Home"
        options={{ title: "الباحث في الحديث" }}
        component={HomeScreen}
        initialParams={{
          font: font,
          title: " الباحث في الحديث",
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        initialParams={{
          font: font,
          title: "حول البرنامج",
        }}
      />
    </Drawer.Navigator>
  );
}
const styles = ScaledSheet.create({
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
