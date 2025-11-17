import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Clipboard, TextInput, Alert, Modal} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Header from '../Header';
import Menu from '../Menu';
import { fonts } from "../../constants/fonts";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const SendInvite = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [inviteLink, setInviteLink] = useState('axlnz\\?node-id=513-461&t=');
  const [modalVisible, setModalVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      "Select Profile Picture",
      "Choose an option to select your profile picture",
      [
        { text: "Camera", onPress: takePhoto },
        { text: "Gallery", onPress: pickImage },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  // Copy invite link function
  const copyToClipboard = () => {
    Clipboard.setString(inviteLink);
    alert('Invite link copied to clipboard!');
  };

  const handleModalToggle = () => {
    setModalVisible(!modalVisible);
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
        <View style={styles.inviteContainer}>
          <Text style={styles.title}>Send Invite</Text>
          <Text style={styles.subtitle}>
            Send an invite with your link to friends and family to support your cause today!
          </Text>

          {/* Profile Section */}
          <View style={styles.profileSection}>
              <TouchableOpacity onPress={showImagePickerOptions}>
                <View style={styles.profilePicContainer}>
                  <Image
                    source={profileImage ? { uri: profileImage } : require('../../assets/images/wed.png')}
                    style={profileImage ? styles.profilePic : styles.cameraIcon}
                  />
                </View>
                {!profileImage && (
                <View style={styles.addProfileTextContainer}>
                  <Ionicons name="camera" size={20} color="black" style={styles.iconStyle} />
                  <Text style={styles.addProfileText}>Add a profile picture</Text>
                </View>
              )}
              </TouchableOpacity>
            </View>

          {/* Invite Link */}
          <View style={styles.linkContainer}>
            <Text style={styles.copyText} onPress={copyToClipboard}>
              Copy link
            </Text>
            <View style={styles.linkInputContainer}>
              <TextInput
                style={styles.linkInput}
                value={inviteLink}
                editable={false}
              />
              <TouchableOpacity onPress={copyToClipboard}>
                <Text style={styles.copyIcon}>📋</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Send Invite Button */}
          <TouchableOpacity style={styles.inviteButton} onPress={handleModalToggle}>
            <Text style={styles.inviteButtonText}>Send Invite</Text>
          </TouchableOpacity>
        </View>

        {/* Modal Popup */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleModalToggle}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Invite sent!</Text>
            <Text style={styles.modalText}>Dreams come true with FundPal</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.allowButton}  onPress={() => {
                  setModalVisible(false);  // Close the modal
                  navigate.push('index');  // Navigate to the SendInvite screen
              }}>
                <Text style={styles.allowButtonText}>Back to home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dontAllowButton} onPress={() => {
                  setModalVisible(false);  // Close the modal
                  navigate.push('MyFund');  // Navigate to the SendInvite screen
              }}>
                <Text style={styles.allowButtonText}>View My Fund</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  inviteContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b6b6b',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  profilePicContainer: {
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    width: 193,
    height: 239,
    marginTop: 5,
    overflow: 'hidden',
  },
  profilePic: {
    width: '100%',
    height: '100%',
  },
  cameraIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  addProfileTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10, // Ensure there is spacing from the image
  },
  addProfileText: {
    fontSize: 12,
    fontFamily: fonts.iregular,
    textDecorationLine: 'underline',
    color: 'black',
    marginLeft: 5,
    marginBottom: 1,
  },
  iconStyle: {
    marginRight: 0,
  },
  linkContainer: {
    width: '100%',
    marginBottom: 20,
  },
  copyText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'left',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  linkInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
  },
  linkInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  copyIcon: {
    fontSize: 18,
    color: '#007bff',
    marginLeft: 10,
  },
  inviteButton: {
    backgroundColor: '#F1AF69',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  inviteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
    width: 310,
    height: 220,
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
    fontSize: 13,
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

export default SendInvite;
