import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';
import { fonts } from "../constants/fonts";

const Menu = ({ onClose }) => {

  const navigate = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
        <Ionicons name="arrow-back-outline" size={22} color="black" />
      </TouchableOpacity>

      <View style={styles.menuItemContainer}>
        <TouchableOpacity style={styles.linkStyle} onPress={() => {navigate.push('index')}}>
          <Text style={styles.menuItem}>Home</Text>
        </TouchableOpacity>
        <Text style={styles.menuDescription}>Discover FundPal</Text>
      </View>

      <View style={styles.menuItemContainer}>
        <Link href="/LinkedProfile" style={styles.linkStyle}>
          <Text style={styles.menuItem}>Donate</Text>
        </Link>
        <Text style={styles.menuDescription}>Discover other fundraisers to support</Text>
      </View>

      <View style={styles.menuItemContainer}>
        <Link href="/StartAFund" style={styles.linkStyle}>
          <Text style={styles.menuItem}>Fundraise</Text>
        </Link>
        <Text style={styles.menuDescription}>Let your friends and family support your cause</Text>
      </View>

      <View style={styles.menuItemContainer}>
        <Link href="/MyFund" style={styles.linkStyle}>
          <Text style={styles.menuItem}>Generate Fund Link</Text>
        </Link>
        <Text style={styles.menuDescription}>Get your link and share it with your friends and family</Text>
      </View>

      <View style={styles.menuItemContainer}>
        <Link href="/About" style={styles.linkStyle}>
          <Text style={styles.menuItem}>About</Text>
        </Link>
        <Text style={styles.menuDescription}>How it works, pricing, and more</Text>
      </View>

      <View style={styles.menuItemContainer}>
        <Link href="/HelpCenter" style={styles.linkStyle}>
          <Text style={styles.menuItem}>Help Center</Text>
        </Link>
        <Text style={styles.menuDescription}>Technical support, help</Text>
      </View>

      <Link href="/StartAFund" style={styles.buttonStart}>
        <Text style={styles.buttonText}>Start a Fund</Text>
      </Link>

      <Link href="/Profile" style={styles.buttonSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  closeIcon: {
    marginBottom: 20,
  },
  menuItemContainer: {
    marginBottom: 25,
  },
  menuItem: {
    fontSize: 16,
    fontFamily: fonts.iregular,
    fontWeight: 'bold',
    color: '#333',
  },
  menuDescription: {
    fontSize: 12,
    fontFamily: fonts.iregular,
    color: '#000000',
    marginTop: 5, // Space between item and description
  },
  buttonStart: {
    backgroundColor: '#F1AF69',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 26,
    marginBottom: 25,
  },
  buttonSignUp: {
    backgroundColor: '#F1AF69',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.ibold,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  linkStyle: {
    textDecorationLine: 'none',
  },
});

export default Menu;
