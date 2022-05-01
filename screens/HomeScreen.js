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
import jsonp from "jsonp";
import fetchJsonp from "fetch-jsonp";
export default function HomeScreen({ route }) {
  const font = route.params.font;
  const [skey, setSkey] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function fetchDorarAPI(skey) {
    const APIURI2 = `https://dorar.net/dorar_api.json?skey=${skey}&callback=`;
    const getAllHadith = (html) => {
      const allHadith = [];
      const allHadithHTML = html.matchAll(
        /<div class="hadith".*?>(.*?)<\/div>/g
      );
      for (const hadith of allHadithHTML) {
        const _hadith = hadith[1]
          .replace(/<\/?[^>]+(>|$)/g, "")
          .replace(/^\d+ -/g, "")
          .trim();
        allHadith.push({
          hadith: _hadith,
        });
      }
      return allHadith;
    };
    const getAllHadithInfo = (html) => {
      const allHadithInfo = [];
      const allHadithInfoHTML = html.matchAll(
        /<div class="hadith-info">([\s\S]*?)<\/div>/g
      );
      for (const hadithInfo of allHadithInfoHTML) {
        const _hadithInfo = hadithInfo[1].replace(/<\/?[^>]+(>|$)/g, "").trim();
        const el_rawi = _hadithInfo.match(/الراوي: ([\s\S]*?) (?=المحدث)/);
        const el_mohdith = _hadithInfo.match(/المحدث: ([\s\S]*?) (?=المصدر)/);
        const source = _hadithInfo.match(
          /المصدر: ([\s\S]*?) (?=الصفحة أو الرقم)/
        );
        const number_or_page = _hadithInfo.match(
          /الصفحة أو الرقم: ([\s\S]*?) (?=خلاصة حكم المحدث)/
        );
        const grade = _hadithInfo.match(/خلاصة حكم المحدث: ([\s\S]*?)$/);

        allHadithInfo.push({
          el_rawi: el_rawi[1].trim(),
          el_mohdith: el_mohdith[1].trim(),
          source: source[1].trim(),
          number_or_page: number_or_page[1].trim(),
          grade: grade[1].trim(),
        });
      }
      return allHadithInfo;
    };
    fetchJsonp(APIURI2)
      .then((response) => {
        return response.json();
      })
      .then((json) => console.log(json));

    jsonp(APIURI2, null, function (err, data) {
      setIsLoading(true);
      if (err) {
        setError(err);
      } else {
        const allHadith = getAllHadith(data.ahadith.result);
        const allHadithInfo = getAllHadithInfo(data.ahadith.result);
        const result = allHadith.map((hadith, index) => {
          return {
            ...hadith,
            ...allHadithInfo[index],
          };
        });
        setData(result);
      }
      setIsLoading(false);
    });
  }
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
          onPress={() => fetchDorarAPI(skey)}
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
        ) : error || !data ? (
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
import Helmet from "react-helmet";
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
