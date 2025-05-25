import { DarkTheme, DefaultTheme as NavigationDefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import Toast from 'react-native-toast-message';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeData, getData } from "@/lib/utils";
import { View, Text } from 'react-native';

const MyLightTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    background: '#000000', // 👈 Set to black (or your theme)
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    getData("password").then((data) => {
      if (data) {
        setIsLoggedIn(true);
      }
    });
  }, []);


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : MyLightTheme}>

      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
          gestureEnabled: true,
        }}>
        {isLoggedIn ? (
          // Show tabs when logged in
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          // Show login screen when not logged in
          <Stack.Screen
            name="(auth)/auth"
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen name="+not-found" />
      </Stack>
      <Toast />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
