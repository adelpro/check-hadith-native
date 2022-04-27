import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  TextInput,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { bleuPalette } from "../colors";
import MapList from "../components/MapList";
export default function HomeScreen({ route }) {
  const font = route.params.font;
  const [skey, setSkey] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = (query) => {
    const APIURI = `https://dorar-hadith-api.herokuapp.com/api/search?value=${query}`;
    const APIURI2 = `https://dorar.net/dorar_api.json?skey=سلام&callback=?`;
    setIsLoading(true);
    setData(null);
    setError(null);
    fetch(APIURI, {
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((result) => {
        setData(result);
      })
      .catch((err) => {
        setData([]);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, font.ExtraBold]}>الباحث في الحديث</Text>
      <Text style={[styles.subHeaderText, font.Light]}>
        يمكنك البرنامج من البحث عن الأحاديث النبوية والتحقق من صحتها إنطلاقا من
        كلمة أو جملة من الحديث
      </Text>
      <View style={styles.serachBarContainer}>
        <TextInput
          value={skey}
          onChangeText={setSkey}
          placeholder="البحث"
          style={[styles.searchInput, font.Light]}
          autoFocus
        />
        <Pressable
          style={({ pressed }) => [
            styles.searchIconOuter,
            { backgroundColor: pressed ? "black" : null },
          ]}
          onPress={() => fetchData(skey)}
          disabled={isLoading}
        >
          <Ionicons
            name="search"
            size={20}
            color="black"
            style={styles.searchIcon}
          />
        </Pressable>
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={bleuPalette.bleu50}
            style={{ margin: 10, padding: 10 }}
          />
        ) : error ? (
          <Text>{error}</Text>
        ) : data.length > 0 ? (
          <MapList data={data} />
        ) : (
          <Text>"Nothing to show"</Text>
        )}
      </View>
    </View>
  );
}
import { ScaledSheet } from "react-native-size-matters";
export const styles = ScaledSheet.create({
  container: {
    flex: 1,
    marginTop: "10@s",
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  serachBarContainer: {
    maxWidth: 800,
    flexDirection: "row",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#bbb",
  },
  searchInput: {
    flex: 1,
    textAlign: "right",
    padding: 10,
    fontSize: "12@s",
    height: "40@s",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  searchIconOuter: {
    padding: 10,
  },
  searchIcon: {
    flex: 1,
    height: "40@s",
  },
  headerText: {
    fontSize: "20@s",
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: "auto",
    margin: 5,
  },
  subHeaderText: {
    fontSize: "12@s",
    padding: 5,
    marginBottom: "20@s",
    textAlign: "center",
    color: "#888",
    marginHorizontal: "auto",
  },
});
