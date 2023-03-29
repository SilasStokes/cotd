import { View, Button, StyleSheet } from "react-native";
import ColorPicker, { Panel3 } from "reanimated-color-picker";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// function getFormattedDateStr(date) {
//   const year = date.getFullYear();
//   const month = date.getMonth() + 1;
//   const day = date.getDate();
//   return `${year}-${month}-${day}`;
// }
// date.toLocaleDateString(); this is the format I want
// i am going to store the date as a key and the color as the value in AsyncStorage
// like so:
// date_color : [
//       {date: color},
//       {date: color},
//       {date: color},
// ]

function parseDateStr(dateStr) {}

export default function HomeScreen({ route, navigation }) {
  const [pickedColor, setPickedColor] = useState("#FFFFFF");
  // reminder that new Date() is called every time the component is rendered
  // so a new date object is created every time even though the value is thrown away
  // so to avoid in the future we can use useEffect to only call new Date() once
  // also note that Date() returns a string, not a Date object
  // and new Date() returns a Date object. weird.
  const { selectedDate } = route.params;
  const [date, setDate] = useState(
    // initDate
    // new Date(year, month, day)
    // new Date(2023, 0, 1)
    new Date(selectedDate.year, selectedDate.month, selectedDate.day)
  );
  console.log(route.params);
  console.log("date: " + date);

  useEffect(() => {
    const { day, month, year } = route.params.selectedDate;

    setDate(new Date(year, month, day));
  }, [route.params.selectedDate]);

  // removed because we're using route.params.selectedDate now
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       // clear AsyncStorage
  //       // await AsyncStorage.removeItem("date_color");
  //       // const jsonStr = await AsyncStorage.getItem("date_color");
  //       // const date_color = jsonStr != null ? JSON.parse(jsonStr) : [];
  //       // setColors(date_color);
  //       // console.log(date_color);
  //     } catch (e) {
  //       // console.log(e);
  //     }
  //   })();
  // }, []);

  function onColorWheelRelease(data) {
    setPickedColor(data.hex);
    console.log(data.hex);
  }
  async function onDonePress(prop) {
    try {
      const jsonStr = await AsyncStorage.getItem("date_color");
      const date_color = jsonStr != null ? JSON.parse(jsonStr) : [];
      const datestr = date.toISOString().substring(0, 10); // this is the YYYY-MM-DD format
      console.log("appending this datestring to date_color: " + datestr);
      date_color.push({ date: datestr, color: pickedColor });
      console.log(date_color);
      await AsyncStorage.setItem("date_color", JSON.stringify(date_color));
    } catch (e) {
      console.log(e);
    }
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
