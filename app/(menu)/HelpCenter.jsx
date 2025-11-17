import React, { useState } from 'react';
import {  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Header from '../Header';
import Menu from '../Menu';
import { fonts } from "../../constants/fonts";
import { useNavigation  } from 'expo-router';

const HelpCenter = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Active'); // State to track active tab

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
        <View style={styles.fundCard}>
          <Text style={styles.sectionTitle}>My Fund</Text>

          {/* Tab Buttons Container */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'Active' ? styles.activeTab : styles.inactiveTab]}
              onPress={() => setActiveTab('Active')}
            >
              <Text style={[styles.tabButtonText, activeTab === 'Active' && styles.activeTabText]}>Active</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'Complete' ? styles.activeTab : styles.inactiveTab]}
              onPress={() => setActiveTab('Complete')}
            >
              <Text style={[styles.tabButtonText, activeTab === 'Complete' && styles.activeTabText]}>Complete</Text>
            </TouchableOpacity>
          </View>

          {/* Render Content Based on Active Tab */}
          {activeTab === 'Active' ? (
            <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/success.png')}
            style={styles.profileImage}
          />
          <Text style={styles.successText}>You do not have active funds</Text>
          <TouchableOpacity style={styles.button} onPress={() => {navigate.push('StartAFund')}}>
            <Text style={styles.buttonText}>Start a Fund</Text>
          </TouchableOpacity>
        </View>
          ) : (
            <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/success.png')}
            style={styles.profileImage}
          />
          <Text style={styles.successText}>You do not have any complete funds</Text>
          <TouchableOpacity style={styles.button} onPress={() => {navigate.push('StartAFund')}}>
            <Text style={styles.buttonText}>Start a Fund</Text>
          </TouchableOpacity>
        </View>
          )}
        </View>
        </ScrollView>
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
  fundCard: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 10,
  },
  sectionTitle: {
    fontSize: 28,
    fontFamily: fonts.ibold,
    textAlign: 'center',
    marginBottom: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#F1AF69',
    width: '45%',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#F1AF69',
  },
  inactiveTab: {
    backgroundColor: '#fff',
  },
  tabButtonText: {
    fontSize: 16,
    fontFamily: fonts.ibold,
  },
  activeTabText: {
    color: '#fff',
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
    fontSize: 24,
    fontFamily: fonts.ibold,
    marginVertical: 10,
    marginTop: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#F1AF69',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
    width: 280,
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

export default HelpCenter;
