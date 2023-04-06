import {
  View,
  Button,
  Text,
  ScrollView,
  StatusBar,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { CalendarList } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ColorContext } from "./ColorContext";
import { useContext } from "react";

export default function SummaryScreen({ route, navigation }) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const { colors } = useContext(ColorContext);
  console.log(colors);
  const [coloredDates, setColoredDates] = useState({});
  // const [colors, setColors] = useState([]);
  // const [selected, setSelected] = useState("");

  // const coloredDates = {};
  useEffect(() => {
    let tempColoredDates = {};
    if (typeof colors !== "undefined") {
      colors.forEach((color, index) => {
        const yyyy_mm_dd = color.date.substring(0, 10);
        tempColoredDates[yyyy_mm_dd] = {
          customStyles: {
            container: {
              backgroundColor: color.color,
              borderRadius: 5,
            },
            text: {
              color: "black",
            },
          },
          disableTouchEvent: true,
        };
      });
      setColoredDates(tempColoredDates);
    }
  }, [colors]);

  // check to see if CalendarList has loaded, if not, display a message
  if (!colors) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>No color recorded yet!</Text>
      </View>
    );
  }

  const onDayPressed = (day) => {
    console.log("selected day", day);
    // check if day is future to today
    if (day.dateString > today.toISOString().substring(0, 10)) {
      console.log("day is in the future so you can't record a color");
      return;
    }
    // setSelected(day.dateString);
    // navigate to the home screen and pass the selected date
    navigation.navigate("Home", {
      selectedDate: { month: day.month - 1, day: day.day, year: day.year },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CalendarList
        pastScrollRange={currentMonth}
        futureScrollRange={11 - currentMonth}
        scrollEnabled={true}
        showScrollIndicator={true}
        markingType={"custom"}
        markedDates={coloredDates ? coloredDates : {}}
        onDayPress={onDayPressed}
      />
      <View style={styles.bottomBar}>
        <Pressable style={styles.button} onPress={(e) => console.log(e)}>
          <Text style={styles.text}>{"export"}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  bottomBar: {
    position: "absolute",
    width: "100%",
    height: "12%",
    // top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: "green",
    // padding: 30,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
