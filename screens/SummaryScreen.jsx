import { View, Button, Text } from "react-native";
import React, { useState, useEffect } from "react";
// import calendar from react native calender
import { Calendar, LocaleConfig } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dates from "../helper/data.js";

export default function SummaryScreen({ route, navigation }) {
  const [colors, setColors] = useState([]);
  const [selected, setSelected] = useState("");

  const coloredDates = {};
  dates.forEach((color, index) => {
    // console.log(color.color);
    const yyyy_mm_dd = color.date.substring(0, 10);
    coloredDates[yyyy_mm_dd] = {
      selected: true,
      //   marked: true,
      disableTouchEvent: true,
      //   dotColor: color.color,
      selectedColor: color.color,
      //   selectedDotColor: color.color,
    };
  });
  //   colors.forEach((color, index) => {
  //     const yyyy_mm_dd = color.date.substring(0, 10);
  //     coloredDates[yyyy_mm_dd] = {
  //       selected: true,
  //       disableTouchEvent: true,
  //       dotColor: color.color,
  //     };
  //   });

  useEffect(() => {
    // create an async immediate function
    (async () => {
      try {
        const jsonStr = await AsyncStorage.getItem("date_color");
        const date_color = jsonStr != null ? JSON.parse(jsonStr) : [];
        setColors(date_color);
        console.log(date_color);
      } catch (e) {
        console.log(e);
      }
    })();

    //   return () => {
    //   }
  }, []);

  if (!colors) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>No color recorded yet!</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Calendar
        disableMonthChange={true}
        hideArrows={true}
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        markedDates={coloredDates}
      />
    </View>
  );

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Summary Screen</Text>
      {colors.map((color, index) => {
        return (
          <View key={index}>
            <Text>{color.color}</Text>
          </View>
        );
      })}
    </View>
  );
}
