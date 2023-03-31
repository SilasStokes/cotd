import {
  View,
  Button,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { CalendarList } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ColorContext } from "./ColorContext";
import { useContext } from "react";

export default function SummaryScreen({ route, navigation }) {
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
  const today = new Date();
  const currentMonth = today.getMonth();

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
    <CalendarList
      pastScrollRange={currentMonth}
      futureScrollRange={11 - currentMonth}
      scrollEnabled={true}
      showScrollIndicator={true}
      markingType={"custom"}
      markedDates={coloredDates ? coloredDates : {}}
      onDayPress={onDayPressed}
    />
  );
}

// colors.forEach((color, index) => {
//   const yyyy_mm_dd = color.date.substring(0, 10);
//   coloredDates[yyyy_mm_dd] = {
//     customStyles: {
//       container: {
//         backgroundColor: color.color,
//         borderRadius: 5,
//       },
//       text: {
//         color: "black",
//       },
//     },
//     disableTouchEvent: true,
//   };
// });

//   colors.forEach((color, index) => {
//     const yyyy_mm_dd = color.date.substring(0, 10);
//     coloredDates[yyyy_mm_dd] = {
//       selected: true,
//       disableTouchEvent: true,
//       dotColor: color.color,
//     };
//   });

// useEffect was not being called when navigating back to this screen
// so useFocusEffect is used instead
// useFocusEffect(
//   React.useCallback(() => {
//     (async () => {
//       try {
//         const jsonStr = await AsyncStorage.getItem("date_color");
//         const date_color = jsonStr != null ? JSON.parse(jsonStr) : [];
//         setColors(date_color);
//         console.log(date_color);
//       } catch (e) {
//         console.log(e);
//       }
//     })();
//   }, [])
// );

// getting the colors from AsyncStorage
// useEffect(() => {
//   (async () => {
//     try {
//       const jsonStr = await AsyncStorage.getItem("date_color");
//       const date_color = jsonStr != null ? JSON.parse(jsonStr) : [];
//       setColors(date_color);
//       console.log(date_color);
//     } catch (e) {
//       console.log(e);
//     }
//   })();
// }, []);
