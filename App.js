import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

// imports from my project
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SummaryScreen from "./screens/SummaryScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  // TODO!
  // check if color has already been recorded for the day. if it has not then show summary. if it has then show home screen
  return (
    <NavigationContainer>
      <Drawer.Navigator useLegacyImplementation initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="Summary" component={SummaryScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
