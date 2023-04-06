import {
  ScrollableView,
  View,
  Button,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function SettingsScreen({ route, navigation }) {
  const [settings, setSettings] = useState({ pushNotifcations: false });
  function handlePushNotificationPressed() {
    setSettings((prev) => ({
      ...prev,
      pushNotifications: !settings.pushNotifications,
    }));
  }

  return (
    <View style={styles.container}>
      <View style={styles.setting}>
        <Pressable
          onPress={handlePushNotificationPressed}
          style={styles.checkbox}
        >
          {/* if push notifications are enabled, display a checkmark, otherwise display a square */}
          {settings.pushNotifications ? (
            <Text>{"[x] - "}</Text>
          ) : (
            <Text>{"[ ] - "}</Text>
          )}
        </Pressable>
        <Text>
          Receive daily push notifications to prompt you to record your color
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  setting: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
  },
  checkbox: {
    rightMargin: 20,
  },
});
