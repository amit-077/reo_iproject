import { View, Text } from "react-native";
import React from "react";
import Login from "../screens/Login";
import { Box, NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigate from "@/components/navigation/AppNavigate";

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <AppNavigate />
    </NavigationContainer>
  );
};

export default App;
