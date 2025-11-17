import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../Header';
import Menu from '../Menu';
import { fonts } from "../../constants/fonts";
import { Link, useNavigation  } from 'expo-router';

const ProfileCreated = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigate = useNavigation();

  return (
    <View style={styles.container}>
      <Header onMenuToggle={toggleMenu} />
      {menuVisible && (
        <View style={styles.menuContainer}>
          <Menu onClose={toggleMenu} />
        </View>
      )}

      <ScrollView style={[styles.content, menuVisible && { opacity: 0.5 }]}>

        {/* Back Button Section */}
        <TouchableOpacity style={styles.backButtonContainer} onPress={() => {navigate.goBack()}}>
          <Ionicons style={styles.arrowIcon} name="arrow-back-outline" size={22} color="black" />
          <Text style={styles.arrowText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/profile.png')}
            style={styles.profileImage}
          />
          <Text style={styles.successText}>Profile Created Successfully!</Text>
          <Text style={styles.subText}>Lorem ipsum dolor sit amet,</Text>
          <Text style={styles.subText}>consectetur adipiscing elit.</Text>
          <TouchableOpacity style={styles.button}>
            <Link href="/StartAFund" style={styles.buttonText}>Start a Fund</Link>
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
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 10, // Adjust for positioning
  },
  arrowIcon: {
    marginRight: 5,
  },
  arrowText: {
    fontSize: 14,
    fontFamily: fonts.iregular,
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
  successText: {
    fontSize: 21,
    fontFamily: fonts.ibold,
    marginVertical: 10,
    marginTop: 40,
  },
  subText: {
    fontSize: 16,
    fontFamily: fonts.iregular,
  },
  button: {
    backgroundColor: '#F1AF69',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
    width: 318,
    height: 56,
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: fonts.ibold,
    textAlign: 'center',
    justifyContent: 'center',
  },
});

export default ProfileCreated;
