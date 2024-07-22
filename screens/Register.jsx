import { SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Box, Button, Input, StatusBar, Text, useToast } from "native-base";
import supabase from "@/utils/supabase";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const toast = useToast();

  const registerUser = async () => {
    try {
      let { userExists } = await supabase
        .from("users")
        .select("*")
        .eq("email", email);

      if (userExists?.length > 0) {
        toast.show({ description: "User already exists" });
      }

      let data = await supabase
        .from("users")
        .insert([{ name: name, email: email, password: password }]);

      if (data) {
        toast.show({ description: "User register successfully" });
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
          <Text fontSize={"30"}>SignUp Screen</Text>
          <Box w={"90%"} mt={"5"} display={"flex"} flexDir={"column"} gap={"2"}>
            <Input
              placeholder="Name"
              fontSize={"16"}
              onChangeText={(e) => {
                setName(e);
              }}
            ></Input>
            <Input
              placeholder="Email"
              fontSize={"16"}
              onChangeText={(e) => {
                setEmail(e);
              }}
            ></Input>
            <Input
              placeholder="Password"
              type="password"
              fontSize={"16"}
              onChangeText={(e) => {
                setPassword(e);
              }}
            ></Input>
            <Box>
              <Button onPress={registerUser}>SignUp</Button>
              <Box
                display={"flex"}
                justifyContent={"center"}
                flexDir={"row"}
                mt={"2"}
              >
                <Text>Don't have an account ? </Text>
                <TouchableOpacity
                  onPress={() => {
                    console.log("Pressed");
                    navigation.navigate("Login");
                  }}
                >
                  <Text>Login</Text>
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default Register;
