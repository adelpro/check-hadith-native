import { Platform, Pressable, View, Text, Image, Linking } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import { bleuPalette } from "../colors";
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
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/adaptive-icon.png")}
            style={styles.logoImage}
          />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <Pressable>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            padding: 20,
            justifyContent: "center",
          }}
        >
          <Ionicons
            name="logo-twitter"
            size={24}
            color="black"
            style={{ padding: 5 }}
            onPress={() => {
              Linking.openURL("https://twitter.com/adelpro");
            }}
          />
          <Ionicons
            name="logo-facebook"
            size={24}
            color="black"
            style={{ padding: 5 }}
            onPress={() => {
              Linking.openURL("https://www.facebook.com/adel.benyahia");
            }}
          />
          <Ionicons
            name="logo-reddit"
            size={24}
            color="black"
            style={{ padding: 5 }}
            onPress={() => {
              Linking.openURL("https://www.reddit.com/user/adelbenyahia");
            }}
          />
        </View>
        <Text style={{ textAlign: "center" }}>V1.3 build 0001</Text>
      </Pressable>
    </View>
  );
};
export default function CustomDrawerNavigatorRight(font) {
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
      flexDirection: "row-reverse",
      justifyContent: "flex-start",
    },

    drawerActiveTintColor: bleuPalette.bleu100,
    drawerInactiveTintColor: bleuPalette.bleu20,
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
              name={focuced ? "home" : "home-outline"}
              size={size}
              color={color}
              style={styles.screenIconStyle}
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
                focused ? "information-circle" : "information-circle-outline"
              }
              size={size}
              color={color}
              style={styles.screenIconStyle}
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
  screenIconStyle: {
    position: "absolute",
    alignSelf: "center",
    right: 10,
  },
  headerRightTiteStyle: {
    fontFamily: "Tajawal_500Medium",
    fontSize: 24,
  },
  imageContainer: {
    marginVertical: "20@vs",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: 150,
    height: 150,
    borderColor: "#ccc",
    borderRadius: 75,
    resizeMode: "stretch",
  },
});
