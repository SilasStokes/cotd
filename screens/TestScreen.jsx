import { View, Text, Button, StyleSheet } from "react-native";
import { useContext } from "react";
import { ColorContext } from "./ColorContext";
export default function TestScreen() {
  const colors = useContext(ColorContext);
  console.log(colors);
  return (
    <View>
      <Text>Test Screen</Text>
    </View>
  );
}
