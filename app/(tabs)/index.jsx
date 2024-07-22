import { Image, StyleSheet, Platform } from "react-native";
import App from "@/components/App";
import { NativeBaseProvider, Box, StatusBar } from "native-base";

export default function HomeScreen() {
  return (
    <NativeBaseProvider>
      <App />
    </NativeBaseProvider>
  );
}
