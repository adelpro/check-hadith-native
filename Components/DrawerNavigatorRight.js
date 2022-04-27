import Ionicons from "@expo/vector-icons/Ionicons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Platform, Pressable, Text } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
export default function DrawerNavigatorRight({ font }) {
  const Drawer = createDrawerNavigator();
  const defaultOptions = ({ navigation, route }) => ({
    headerRight: () => {
      return (
        <>
          <Pressable onPress={() => navigation.openDrawer()}>
            <Ionicons
              name={Platform.OS === "android" ? "md-menu" : "ios-menu"}
              size={32}
              color={"#000"}
              style={{ marginRight: 10 }}
            />
          </Pressable>
          <Text style={styles.headerRightTiteStyle}>{route.params.title}</Text>
        </>
      );
    },
    headerLeftContainerStyle: { display: "none" },
    headerRightContainerStyle: {
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "row-reverse",
      alignItems: "center",
      marginRight: 10,
    },
    headerTitleStyle: {
      display: "none",
    },
    drawerPosition: "right",
    sceneContainerStyle: {
      flex: 1,
      width: "100%",
    },
    drawerItemStyle: {
      backgroundColor: "red",
    },
  });
  return (
    <Drawer.Navigator screenOptions={defaultOptions}>
      <Drawer.Screen
        name="Home"
        options={{
          title: "الباحث في الحديث",
          drawerIcon: ({ color, size, focuced }) => (
            <Ionicons
              name={focuced ? "home-outline" : "home"}
              size={size}
              color={color}
            />
          ),
        }}
        component={HomeScreen}
        initialParams={{
          font: { font },
          title: " الباحث في الحديث",
        }}
      />
      <Drawer.Screen
        name="About"
        options={{
          title: "حول البرنامج",
          drawerIcon: ({ color, size, focused }) => (
            <Ionicons
              name={
                focused ? "information-circle-outline" : "information-circle"
              }
              size={size}
              color={color}
            />
          ),
        }}
        component={AboutScreen}
        initialParams={{
          font: { font },
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
