import { View, Button, StyleSheet } from "react-native";
import ColorPicker, { Panel3 } from "reanimated-color-picker";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// date.toLocaleDateString(); this is the format I want
// i am going to store the date as a key and the color as the value in AsyncStorage
// like so:
// date_color : [
//       {date: color},
//       {date: color},
//       {date: color},
// ]

import { ColorContext } from "./ColorContext";
import { useContext } from "react";

export default function HomeScreen({ route, navigation }) {
  const { addColor } = useContext(ColorContext);
  const [pickedColor, setPickedColor] = useState("#FFFFFF");
  // reminder that new Date() is called every time the component is rendered
  // so a new date object is created every time even though the value is thrown away
  // so to avoid in the future we can use useEffect to only call new Date() once
  // also note that Date() returns a string, not a Date object
  // and new Date() returns a Date object. weird.
  const { selectedDate } = route.params;
  const [date, setDate] = useState(
    new Date(selectedDate.year, selectedDate.month, selectedDate.day)
  );
  console.log(route.params);
  console.log("date: " + date);

  useEffect(() => {
    const { day, month, year } = route.params.selectedDate;

    setDate(new Date(year, month, day));
  }, [route.params.selectedDate]);

  function onColorWheelRelease(data) {
    setPickedColor(data.hex);
    console.log(data.hex);
  }
  async function onDonePress(prop) {
    const datestr = date.toISOString().substring(0, 10); // this is the YYYY-MM-DD format
    console.log("appending this datestring to date_color: " + datestr);
    addColor(pickedColor, datestr);

    navigation.navigate("Summary");
  }
  return (
    <View style={styles.container}>
      <ColorPicker
        value={pickedColor}
        sliderThickness={30}
        thumbSize={33}
        thumbShape="circle"
        onComplete={onColorWheelRelease}
        style={styles.colorPicker}
      >
        <Panel3 />
      </ColorPicker>
      {/* // button when pressed will navigate to SummaryScreen */}
      <Button onPress={onDonePress} title="Done" />
      {/* <Button
        onPress={() => navigation.navigate("Summary")}
        title="go to summary"
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 40,
  },
  colorPicker: {
    width: "75%",
    justifyContent: "center",
  },
});
