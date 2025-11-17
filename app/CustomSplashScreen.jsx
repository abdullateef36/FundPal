import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

const CustomSplashScreen = ({ fontsLoaded }) => {
  useEffect(() => {
    const hideSplash = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    hideSplash();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/icons/logo2.png')} style={styles.image} />
      <Text style={styles.text}>FundPal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    width: 121,
    height: 127,
    resizeMode: 'contain',
  },
  text: {
    marginTop: -10,
    fontSize: 36,
    fontFamily: 'Judson-Regular',
    color: '#000000',
  },
});

export default CustomSplashScreen;
