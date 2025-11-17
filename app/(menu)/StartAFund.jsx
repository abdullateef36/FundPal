import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import Header from '../Header';
import Menu from '../Menu';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from "../../constants/fonts";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector to get state
import { startFund } from '../../src/redux/slices/authSlice'; // Import the startFund action

const StartAFund = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.auth.user); // Assuming the user state is stored in auth slice

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    fundTitle: '',
    category: '',
    description: '',
    goal: '',
    donationMethod: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false }); // Clear error for the field
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
        setErrors({ ...errors, profileImage: false }); // Clear error if image is selected
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const validateFields = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = true;
    if (!formData.lastName.trim()) newErrors.lastName = true;
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.fundTitle.trim()) newErrors.fundTitle = true;
    if (!formData.goal.trim()) newErrors.goal = true;
    if (!profileImage) newErrors.profileImage = true;
    if (!formData.donationMethod.trim()) newErrors.donationMethod = true;

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    // Redirect to sign-in screen if the user is not logged in
    if (!user) {
      Alert.alert(
        'Authentication Required',
        'You must be logged in to launch a fund.',
        [
          { text: 'OK', onPress: () => router.push('/Signin') },
        ]
      );
      return;
    }

    if (!validateFields()) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    if (!validateFields()) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    if (profileImage) {
      const uriParts = profileImage.split('.');
      const fileType = uriParts[uriParts.length - 1];

      formDataToSend.append('profileImage', {
        uri: profileImage,
        name: `profile.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    try {
      const response = await fetch('http://192.168.1.103:3000/funds', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        // Dispatch startFund action to save fund data in Redux
        dispatch(
          startFund({
            title: formData.fundTitle,
            description: formData.description,
            goal: formData.goal,
            donationMethod: formData.donationMethod,
            image: profileImage,
          })
        );

        Alert.alert('Success', 'Fund launched successfully!', [
          {
            text: 'OK',
            onPress: () => navigate.push('FundLaunched'),
          },
        ]);
      } else {
        Alert.alert('Error', 'Failed to launch fund.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Alert.alert('Error', 'Something went wrong.');
    }
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
        <TouchableOpacity style={styles.backButtonContainer} onPress={() => { navigate.goBack(); }}>
          <Ionicons style={styles.arrowIcon} name="arrow-back" size={24} color="black" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Start A Fund</Text>
        <Text style={styles.subtitle}>
          Start a fund to receive support from friends and family today!
        </Text>

        <TextInput
          style={[styles.input, errors.firstName && styles.inputError]}
          placeholder="First name *"
          value={formData.firstName}
          onChangeText={(text) => handleChange('firstName', text)}
        />
        <TextInput
          style={[styles.input, errors.lastName && styles.inputError]}
          placeholder="Last name *"
          value={formData.lastName}
          onChangeText={(text) => handleChange('lastName', text)}
        />
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Email address *"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
        />
        <TextInput
          style={[styles.input, errors.fundTitle && styles.inputError]}
          placeholder="Fund title *"
          value={formData.fundTitle}
          onChangeText={(text) => handleChange('fundTitle', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={formData.category}
          onChangeText={(text) => handleChange('category', text)}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description"
          multiline
          numberOfLines={4}
          value={formData.description}
          onChangeText={(text) => handleChange('description', text)}
        />
        <TextInput
          style={[styles.input, errors.goal && styles.inputError]}
          placeholder="Goal to raise *"
          value={formData.goal}
          onChangeText={(text) => handleChange('goal', text)}
        />
        <TextInput
          style={[styles.input, errors.donationMethod && styles.inputError]}
          placeholder="Add donation method *"
          value={formData.donationMethod}
          onChangeText={(text) => handleChange('donationMethod', text)}
        />

        <View style={styles.profileSection}>
          <TouchableOpacity onPress={pickImage}>
            <View
              style={[
                styles.profilePicContainer,
                errors.profileImage && styles.inputError,
              ]}
            >
              <Image
                source={
                  profileImage
                    ? { uri: profileImage }
                    : require('../../assets/icons/Camera1.png')
                }
                style={profileImage ? styles.profilePic : styles.cameraIcon}
              />
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Launch Fund</Text>
        </TouchableOpacity>
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
    padding: 20,
    zIndex: -1,
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 5, // Space between icon and text
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.ibold,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    fontFamily: fonts.iregular,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F1AF6933',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 20,
    fontFamily: fonts.iregular,
    color: '#000',
    width: 318,
    height: 56,
  },
  textArea: {
    width: 318,
    height: 56,
    textAlignVertical: 'top',
    fontSize: 20,
    fontFamily: fonts.iregular,
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
    width: 300,
    height: 300,
    marginTop: 5,
    overflow: 'hidden',
  },
  profilePic: {
    width: '100%',
    height: '100%',
  },
  cameraIcon: {
    width: 100,
    height: 100,
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
  button: {
    backgroundColor: '#F1AF69',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.ibold,
  },
  secondaryButton: {
    backgroundColor: '#F1AF69',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 40,
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.ibold,
  },
});

export default StartAFund;