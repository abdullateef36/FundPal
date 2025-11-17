import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import CustomSplashScreen from './CustomSplashScreen';
import { Provider } from 'react-redux';
import store from '../src/redux/store';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);
  const [fontsLoaded, error] = useFonts({
    "Judson-Regular": require("../assets/fonts/Judson-Regular.ttf"),
    "Judson-Bold": require("../assets/fonts/Judson-Bold.ttf"),
    "Judson-Italic": require("../assets/fonts/Judson-Italic.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-Italic": require("../assets/fonts/Inter-Italic.ttf"),
    "Volkhov-Regular": require("../assets/fonts/Volkhov-Regular.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) {
      // Hide the custom splash screen after fonts are loaded
      setTimeout(() => {
        setIsSplashScreenVisible(false);
        SplashScreen.hideAsync();
      }, 3000); // Customize the delay as needed
    }
  }, [fontsLoaded, error]);

  if (isSplashScreenVisible) {
    return <CustomSplashScreen fontsLoaded={fontsLoaded} />;
  }

  return (
    <Provider store={store}>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(menu)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
    </Provider>
  );
};

export default RootLayout;
