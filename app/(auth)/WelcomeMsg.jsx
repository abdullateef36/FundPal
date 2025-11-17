import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, Image } from 'react-native';
import Header from '../Header';
import Menu from '../Menu';
import { fonts } from "../../constants/fonts";
import { useNavigation } from 'expo-router';

const WelcomeMsg = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigation();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.container}>
      <Header onMenuToggle={toggleMenu} />
      {menuVisible && (
        <View style={styles.menuContainer}>
          <Menu onClose={toggleMenu} />
        </View>
      )}

      <ScrollView style={[styles.content, menuVisible && { opacity: 0.5 }]}>

        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/welcome.png')}
            style={styles.profileImage}
          />
          <Text style={styles.subText}>Lorem ipsum dolor sit amet,</Text>
          <Text style={styles.subText}>consectetur adipiscing elit.</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={() => {navigate.push('index')}}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar
        barStyle="dark-content"  // Change to "light-content" for white text
        backgroundColor="#fff"  // Set the background color of the status bar
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    marginTop: 19,
  },
  content: {
    flex: 1,
    zIndex: -1,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 60,
  },
  profileImage: {
    width: 217,
    height: 217,
    borderRadius: 100,
  },
  subText: {
    fontSize: 16,
    fontFamily: fonts.iregular,
    marginTop: 13,
    marginBottom: -10,
  },
  button: {
    backgroundColor: '#F1AF69',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
    width: 318,
    height: 56,
    marginTop: 60,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: fonts.ibold,
    textAlign: 'center',
    justifyContent: 'center',
  },
});

export default WelcomeMsg;
