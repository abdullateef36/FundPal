import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../Header';
import Menu from '../Menu';
import { fonts } from "../../constants/fonts";
import { useNavigation } from 'expo-router';

const FundLaunhed = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigate = useNavigation();

  const handleModalToggle = () => {
    setModalVisible(!modalVisible);
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

        {/* Back Button Section */}
        <TouchableOpacity style={styles.backButtonContainer} onPress={() => {navigate.goBack()}}>
          <Ionicons style={styles.arrowIcon} name="arrow-back-outline" size={22} color="black" />
          <Text style={styles.arrowText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/fund.jpeg')}
            style={styles.profileImage}
          />
          <Text style={styles.successText}>Fund Launched Successfully!</Text>
          <Text style={styles.subText}>Lorem ipsum dolor sit amet,</Text>
          <Text style={styles.subText}>consectetur adipiscing elit.</Text>

          {/* First Button */}
          <TouchableOpacity style={styles.button} onPress={handleModalToggle}>
            <Text style={styles.buttonText}>Start Fund Link</Text>
          </TouchableOpacity>

          {/* Second Button */}
          <TouchableOpacity style={styles.button} onPress={() => {navigate.navigate('MyFund')}}>
            <Text style={styles.buttonText}>View My Fund</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal Popup */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleModalToggle}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Allow FundPal Access Contact?</Text>
            <Text style={styles.modalText}>Sync to send invite to friends and family in your contacts</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.allowButton}  onPress={() => {
                  setModalVisible(false);  // Close the modal
                  navigate.navigate('SendInvite');  // Navigate to the SendInvite screen
              }}>
                <Text style={styles.allowButtonText}>Allow</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dontAllowButton} onPress={handleModalToggle}>
                <Text style={styles.allowButtonText}>Don't Allow</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
    width: 225,
    height: 225,
    borderRadius: 120,
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
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    height: 250,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: fonts.ibold,
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 20,
  },
  modalText: {
    fontSize: 16,
    fontFamily: fonts.iregular,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  allowButton: {
    backgroundColor: '#F1AF69',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  allowButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: fonts.ibold,
    textAlign: 'center',
  },
  dontAllowButton: {
    backgroundColor: '#F1AF69',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
  },
});

export default FundLaunhed;
