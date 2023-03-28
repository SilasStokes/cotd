import { View, Button, Text } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SummaryScreen({ route, navigation }) {
    const [colors, setColors] = useState([]);

    useEffect(() => {
        // create an async immediate function
        (async () => { 
            try {
                const jsonStr = await AsyncStorage.getItem("date_color");
                const date_color = jsonStr != null ? JSON.parse(jsonStr) : [];
                setColors(date_color);
                console.log(date_color)
            } catch (e) {
                console.log(e)
            }
        })()
    
    //   return () => {
    //   }
    }, [])
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Summary Screen</Text>
      </View>
    );
  }