import { SafeAreaView, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
} from "native-base";
import supabase from "@/utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Video } from "expo-av";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchPublicUrls = async () => {
    let vids = JSON.parse(await AsyncStorage.getItem("videos"));
    setVideos(vids);
    console.log(vids);
  };

  const [currentVideo, setCurrentVideo] = useState("");

  useEffect(() => {
    fetchPublicUrls();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar
        barStyle="light-content" // Use "dark-content" for dark text, "light-content" for light text
        backgroundColor="black" // Set the background color to black
      />

      <Box w={"100%"} h={"100%"} display={"flex"} alignItems={"center"}>
        {/* Modal */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          size={"xl"}
          height={"600"}
        >
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Body>
              <Box w={"100%"} height={"300"}>
                {currentVideo && (
                  <Video
                    source={{ uri: currentVideo }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="contain"
                    shouldPlay
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
              </Box>
            </Modal.Body>
          </Modal.Content>
        </Modal>
        {/* Modal */}
        <Text fontSize={"20"} pt={"5"}>
          Videos
        </Text>

        <Box mt={"10"} w={"100%"} textAlign={"center"}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} mb={"20"}>
            <Box
              display={"flex"}
              gap={"4"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {!videos && (
                <Box>
                  <Text>No videos present</Text>
                </Box>
              )}
              {videos?.map((e, index) => {
                return (
                  <Pressable
                    key={index}
                    onPress={() => {
                      setCurrentVideo(e);
                      setShowModal(true);
                    }}
                    w={"100%"}
                    textAlign={"center"}
                    margin={"auto"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Box
                      w={"90%"}
                      h={"200"}
                      borderWidth={"1"}
                      borderRadius={"10"}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Video
                        source={{ uri: e }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="contain"
                        shouldPlay
                        isLooping
                        style={{ width: "100%", height: "100%" }}
                      />
                    </Box>
                  </Pressable>
                );
              })}
            </Box>
          </ScrollView>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default Videos;
