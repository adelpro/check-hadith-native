import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  TextInput,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { bleuPalette } from "../../colors";
import MapList from "../../Components/MapList";
import { styles } from "./style";
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
