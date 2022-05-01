import { FlatList, Share, Text, Pressable, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import { bleuPalette } from "../colors";
export default function MapList({ data }) {
  const dataWithKey = data.map((item) => {
    return { key: uuid.v4(), ...item };
  });
  const onShare = async (hadith) => {
    Share.share({
      url: require("../assets/adaptive-icon.png"),
      title: "الباحث في الحديث",
      message: hadith,
    });
  };

  return (
    <FlatList
      data={dataWithKey}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.hadith}>{item.hadith}</Text>
          <Text style={styles.hadith_info}>
            <Text style={styles.underline}>الراوي:</Text> {item.el_rawi}
          </Text>
          <Text style={styles.hadith_info}>
            <Text style={styles.underline}>المحدث:</Text>
            {item.el_mohdith}
          </Text>
          <Text style={styles.hadith_info}>
            <Text style={styles.underline}>المصدر:</Text>
            {item.source}
          </Text>
          <Text style={styles.hadith_info}>
            <Text style={styles.underline}>رقم الصفحة:</Text>
            {item.number_or_page}
          </Text>
          <Text style={[styles.grade, styles.hadith_info]}>
            <Text style={styles.underline}>درجة الحديث:</Text>
            {item.grade}
          </Text>
          <View style={styles.share}>
            <Pressable
              onPress={() =>
                onShare(
                  `${item.hadith}\nالراوي: ${item.el_rawi}\nالمحدث: ${item.el_mohdith}\nالمصدر: ${item.source}\nرفم الصفحة: ${item.number_or_page}\nدرجة الحديث: ${item.grade}\n`
                )
              }
            >
              <Ionicons name="share-social" size={24} color="black" />
            </Pressable>
          </View>
        </View>
      )}
    />
  );
}

export const styles = ScaledSheet.create({
  card: {
    borderRadius: 10,
    margin: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  underline: {
    fontSize: "10@s",
    textDecorationLine: "underline",
  },
  hadith_info: {
    fontSize: "10@s",
  },
  hadith: {
    fontSize: "12@s",
    fontWeight: "bold",
    padding: 5,
    marginVertical: "5@s",
  },
  grade: {
    marginBottom: "5@s",
  },
  list: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  share: {
    justifyContent: "flex-end",
    position: "absolute", //Here is the trick
    bottom: 0,
    margin: 0,
    padding: 2,
    height: 40,
    width: 40,
    left: 0,
    borderTopRightRadius: 40,
    backgroundColor: bleuPalette.bleu100, //"#5F5F5F",
    alignSelf: "flex-start",
  },
});
