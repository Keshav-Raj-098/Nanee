import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import Toast from 'react-native-toast-message';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeData, getData } from "@/lib/utils";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    getData("password").then((data) => {
            if (data) {
                setIsLoggedIn(false);
            }
        });
  }, []);

  if (!loaded || isLoggedIn === null) {
    // Still loading fonts or checking login state
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack 
      screenOptions={{ headerShown: false,
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
