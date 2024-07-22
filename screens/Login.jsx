import { SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Box, Button, Input, Link, StatusBar, Text, useToast } from "native-base";
import supabase from "../utils/supabase.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const loginUser = async () => {
    try {
      let { data } = await supabase
        .from("users")
        .select("*")
        .eq("email", email);

      if (data.length < 1 || data == null) {
        toast.show({ description: "User does not exist" });
      } else {
        if (data[0].password === password) {
          toast.show({ description: "Logged In successfully" });
          data[0].password = "";
          await AsyncStorage.setItem("user", JSON.stringify(data[0]));
        } else {
          toast.show({ description: "Invalid credentials" });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar
        barStyle="light-content" // Use "dark-content" for dark text, "light-content" for light text
        backgroundColor="black" // Set the background color to black
      />
      <Box color={"black"}>
        <Box
          w={"100%"}
          h={"100%"}
          display={"flex"}
          alignItems={"center"}
          pt={"250"}
        >
          <Text fontSize={"30"}>Login Screen</Text>
          <Box w={"90%"} mt={"5"} display={"flex"} flexDir={"column"} gap={"2"}>
            <Input
              placeholder="Email"
              fontSize={"16"}
              onChangeText={(e) => {
                setEmail(e);
              }}
            ></Input>
            <Input
              placeholder="Password"
              fontSize={"16"}
              onChangeText={(e) => {
                setPassword(e);
              }}
            ></Input>
            <Box>
              <Button onPress={loginUser}>Login</Button>
              <Box
                display={"flex"}
                justifyContent={"center"}
                flexDir={"row"}
                mt={"2"}
              >
                <Text
                  onPress={async () => {
                    console.log(await AsyncStorage.getItem("user"));
                  }}
                >
                  Don't have an account ?{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    console.log("Pressed");
                    navigation.navigate("Register");
                  }}
                >
                  <Text>SignUp</Text>
                </TouchableOpacity>

                {/* Profile */}
                <TouchableOpacity
                  onPress={() => {
                    console.log("Pressed");
                    navigation.navigate("Profile");
                  }}
                >
                  <Text>Profile</Text>
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default Login;
