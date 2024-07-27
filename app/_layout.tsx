import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Comfortaa-Bold": require("../assets/fonts/Comfortaa-Bold.ttf"),
    "Comfortaa-Light": require("../assets/fonts/Comfortaa-Light.ttf"),
    "Comfortaa-Medium": require("../assets/fonts/Comfortaa-Medium.ttf"),
    "Comfortaa-Regular": require("../assets/fonts/Comfortaa-Regular.ttf"),
    "Comfortaa-SemiBold": require("../assets/fonts/Comfortaa-SemiBold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;