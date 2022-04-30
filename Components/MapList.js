import { FlatList, View, Text, Share, Pressable } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import uuid from "react-native-uuid";
export default function MapList({ data }) {
  const dataWithKey = data.map((item) => {
    return { key: uuid.v4(), ...item };
  });
  const onShare = async (message) => {
    try {
      const result = await Share.share({
        message: { message },
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
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
            <Pressable onPress={onShare}>
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
    position: "absolute", //Here is the trick
    bottom: 0,
    margin: 10,
    padding: 10,
    alignSelf: "flex-start",
  },
});
