import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// imports from my project
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SummaryScreen from "./screens/SummaryScreen";
import dates from "./helper/data";

const Drawer = createDrawerNavigator();

export default function App() {
  const today = new Date();
  const selectedDate = {
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDate(),
  };

  // TODO! remove this for production
  React.useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem("date_color", JSON.stringify(dates));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // TODO!
  // check if color has already been recorded for the day. if it has not then show summary. if it has then show home screen
  return (
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
  );
}
