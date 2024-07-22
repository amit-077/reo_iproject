import { SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Button, Image, StatusBar, Text, useToast } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import supabase from "@/utils/supabase";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";

const Profile = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState({});
  const toast = useToast();
  const [video1, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickVideo = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // console.log(result.assets[0]);
      // uploadVideo(result.assets[0]);
      // setVideo(result.assets[0]);
      const img = result.assets[0];
      const base64 = await FileSystem.readAsStringAsync(img.uri, {
        encoding: "base64",
      });
      const filePath = `ad3hufnbsjdhsjd73848/${new Date().getTime()}.${
        img.type === "image" ? "png" : "mp4"
      }`;
      console.log(filePath);

      const contentType = img.type === "image" ? "image/png" : "video/mp4";
      let data = await supabase.storage
        .from("user_videos")
        .upload(filePath, decode(base64), { contentType });

      console.log(data);

      setTimeout(() => {
        getVideoURL(filePath);
      }, 2000);
    }
  };

  const getVideoURL = async (file) => {
    let data = await supabase.storage.from("user_videos").getPublicUrl(file);
    console.log(data.data.publicUrl);
    toast.show({ description: "Video uploaded successfully" });
    let videosArray = JSON.parse(await AsyncStorage.getItem("videos"));
    if (!videosArray) {
      let arr = [data.data.publicUrl];
      await AsyncStorage.setItem("videos", JSON.stringify(arr));
    } else {
      videosArray.push(data.data.publicUrl);
      await AsyncStorage.setItem("videos", JSON.stringify(videosArray));
    }
  };

  const getUserData = async () => {
    try {
      let data = JSON.parse(await AsyncStorage.getItem("user"));
      if (!data) {
        toast.show({ description: "Please login first" });
        navigation.navigate("Login");
        return;
      }
      if (data) {
        setUserDetails(data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar
        barStyle="light-content" // Use "dark-content" for dark text, "light-content" for light text
        backgroundColor="black" // Set the background color to black
      />
      <Box
        w={"100%"}
        h={"100%"}
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box pt={"10"}>
          <Text fontSize={"25"}>Profile Screen</Text>
        </Box>
        <Box
          display={"flex"}
          flexDir={"column"}
          gap={"2"}
          mt={"10"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box display={"flex"} flexDir={"row"}>
            <Text fontSize={"19"}>Name : </Text>
            <Text fontSize={"19"}>{userDetails?.name}</Text>
          </Box>
          <Box display={"flex"} flexDir={"row"}>
            <Text fontSize={"19"}>Email : </Text>
            <Text fontSize={"19"}>{userDetails?.email}</Text>
          </Box>
          <Box display={"flex"} flexDir={"column"}>
            <Text fontSize={"19"}>Profile Photo </Text>
            <Image
              source={{
                uri: (src =
                  "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg"),
              }}
              alt="image"
              height={"100"}
              width={"100"}
              borderRadius={"20"}
              ml={"2"}
              mt={"3"}
            />
          </Box>
          <Box>
            <Button onPress={pickVideo}>Upload Video</Button>
          </Box>
          <Box>
            <Button
              onPress={() => {
                navigation.navigate("Videos");
              }}
            >
              See all Videos
            </Button>
          </Box>
          <Text>{uploading && "Uploading..."}</Text>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default Profile;
