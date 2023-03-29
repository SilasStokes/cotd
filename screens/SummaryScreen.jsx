import {
  View,
  Button,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
// import calendar from react native calender
import { Calendar, CalendarList } from "react-native-calendars";
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
      // create a customStyles object that sets the entire available space to the color.color
      customStyles: {
        container: {
          backgroundColor: color.color,
          borderRadius: 5,
        },
        text: {
          color: "black",
        },
      },

      // selected: true,
      disableTouchEvent: true,
      // selectedColor: color.color,
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

  // getting the colors from AsyncStorage
  useEffect(() => {
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
  }, []);

  // check to see if CalendarList has loaded, if not, display a message
  if (!colors) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>No color recorded yet!</Text>
      </View>
    );
  }
  const today = new Date();
  const currentMonth = today.getMonth();

  return (
    <CalendarList
      // Callback which gets executed when visible months change in scroll view. Default = undefined
      onVisibleMonthsChange={(months) => {
        console.log("now these months are visible", months);
      }}
      // Max amount of months allowed to scroll to the past. Default = 50
      pastScrollRange={currentMonth}
      // Max amount of months allowed to scroll to the future. Default = 50
      futureScrollRange={11 - currentMonth}
      // Enable or disable scrolling of calendar list
      scrollEnabled={true}
      // Enable or disable vertical scroll indicator. Default = false
      showScrollIndicator={true}
      markingType={"custom"}
      markedDates={coloredDates}
    />
  );

  return (
    <SafeAreaView style={{ paddingTop: StatusBar.currentHeight }}>
      <ScrollView style={{}}>
        <Calendar
          disableMonthChange={true}
          hideArrows={true}
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          markedDates={coloredDates}
        />
      </ScrollView>
    </SafeAreaView>
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
