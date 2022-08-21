import React, { useEffect, useRef, useState } from "react";
import { Animated, View, ScrollView } from "react-native";
export default Animation = () => {
  const translation = useRef(new Animated.Value(0)).current;
  const [headerShown, setHeaderShown] = useState(false);
  useEffect(() => {
    Animated.timing(translation, {
      toValue: headerShown ? 0 : -100,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [headerShown]);

  return (
    <>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          backgroundColor: "tomato",
          transform: [{ translateX: headerShown ? 0 : -100 }],
        }}
      />

      <ScrollView
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrolling,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        // onScroll will be fired every 16ms
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, height: 1000 }} />
      </ScrollView>
    </>
  );
};
