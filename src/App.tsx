import React from "react";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
      }}>
      <Text style={{ textAlign: "center" }}>
        Welcome to Flip React Native App
      </Text>
    </View>
  );
}
