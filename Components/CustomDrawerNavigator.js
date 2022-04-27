import { Platform, Pressable, View, Text, Image } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScaledSheet } from "react-native-size-matters";
const CustomDrawerContent = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            margin: 5,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../assets/adaptive-icon.png")}
            style={{
              width: 150,
              height: 150,
              borderColor: "#ccc",
              borderwidth: 1,
              borderRadius: "50%",
              resizeMode: "stretch",
            }}
          />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View>
        <Text>AAA</Text>
      </View>
    </View>
  );
};
export default function CustomDrawerNavigator(font) {
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
    HeaderShown: false,
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
    <Drawer.Navigator
      screenOptions={defaultOptions}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
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
