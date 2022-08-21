import { View, Text } from "react-native";

export default function AboutScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>
        يمكنك البرنامج من البحث عن الأحاديث النبوية والتحقق من صحتها إنطلاقا من
        كلمة أو جملة من الحديث
      </Text>
    </View>
  );
}
