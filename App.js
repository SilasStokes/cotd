import * as React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// imports from my project
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SummaryScreen from "./screens/SummaryScreen";
import dates from "./helper/data";
import { ColorContext } from "./screens/ColorContext";
import TestScreen from "./screens/TestScreen";

const Drawer = createDrawerNavigator();

const ColorContextProvider = ({ children }) => {
  const [colors, setColors] = useState([]);

  // hexcolorstr formatted: '#FFFFFF'
  // datestr formatted: '2021-03-01' 'YYYY-MM-DD'
  const addColor = (hexcolorstr, datestr) => {
    setColors((prevColors) => [
      ...prevColors,
      { color: hexcolorstr, date: datestr },
    ]);
  };

  useEffect(() => {
    AsyncStorage.setItem("date_color", JSON.stringify(colors));
  }, [colors]);

  useEffect(() => {
    AsyncStorage.getItem("date_color").then((value) => {
      if (value) {
        setColors(JSON.parse(value));
      }
    });
  }, []);

  return (
    <ColorContext.Provider
      value={{
        colors,
        addColor,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export default function App() {
  // const { colors, addColor } = useColors();
  const today = new Date();
  const selectedDate = {
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDate(),
  };
  // return (
  //   <ColorContextProvider>
  //     <SummaryScreen />
  //   </ColorContextProvider>
  // );

  // TODO!
  // check if color has already been recorded for the day. if it has not then show summary. if it has then show home screen
  return (
    <ColorContextProvider>
      <NavigationContainer>
        <Drawer.Navigator useLegacyImplementation initialRouteName="Home">
          {/* pass the today variable to the HomeScreen component */}
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            initialParams={{ selectedDate: selectedDate }}
          />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
          <Drawer.Screen name="Summary" component={SummaryScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </ColorContextProvider>
  );
}

// TODO! remove this for production
// React.useEffect(() => {
//   (async () => {
//     try {
//       await AsyncStorage.setItem("date_color", JSON.stringify(dates));
//     } catch (error) {
//       console.log(error);
//     }
//   })();
// }, []);

// React.useEffect(() => {
//   (async () => {
//     try {
//       const jsonStr = await AsyncStorage.getItem("date_color");
//       const date_color = jsonStr != null ? JSON.parse(jsonStr) : [];
//       ColorContext = createContext(date_color);
//     } catch (error) {
//       console.log(error);
//     }
//   })();
// }, []);
