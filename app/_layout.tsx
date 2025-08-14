// Ensure URL and related APIs exist for Appwrite SDK in React Native/Expo
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "react-native-url-polyfill/auto";
import "./globals.css";

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
