import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, Alert, ScrollView, TextInput } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Link } from 'expo-router';
import Header from '../Header';
import Menu from '../Menu';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fonts } from "../../constants/fonts";
import { CountryPicker } from 'react-native-country-codes-picker';
import { useNavigation  } from 'expo-router';
import { useDispatch } from 'react-redux';
import { login } from '../../src/redux/slices/authSlice';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [country, setCountry] = useState({ name: 'Country', dialCode: '', flag: '' });
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isAbove18, setIsAbove18] = useState(false);
  const [isAgreedToTerms, setIsAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigation();

  // State variables to track input validity
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

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

  const handleCountrySelection = (selectedCountry) => {
    setCountry({
      name: selectedCountry.name.en,
      dialCode: selectedCountry.dial_code,
      flag: selectedCountry.flag,
    });
    setPickerVisible(false);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const validateInputs = () => {
    let valid = true;
    if (!profileImage) {
      Alert.alert("Validation Error", "Please select a profile picture.");
      valid = false;
    }
    if (!firstName) {
      setIsFirstNameValid(false);
      valid = false;
    } else {
      setIsFirstNameValid(true);
    }
    if (!lastName) {
      setIsLastNameValid(false);
      valid = false;
    } else {
      setIsLastNameValid(true);
    }
    if (!email.includes('@')) {
      setIsEmailValid(false);
      valid = false;
    } else {
      setIsEmailValid(true);
    }
    if (!phoneNumber) {
      setIsPhoneNumberValid(false);
      valid = false;
    } else {
      setIsPhoneNumberValid(true);
    }
    if (password.length < 6) {
      setIsPasswordValid(false);
      valid = false;
    } else {
      setIsPasswordValid(true);
    }
    if (password !== confirmPassword) {
      setIsConfirmPasswordValid(false);
      valid = false;
    } else {
      setIsConfirmPasswordValid(true);
    }
     // Validate isAbove18 checkbox
  if (!isAbove18) {
    Alert.alert("Validation Error", "You must confirm that you are above the age of 18.");
    valid = false;
  }
  // Validate isAgreedToTerms checkbox
  if (!isAgreedToTerms) {
    Alert.alert("Validation Error", "You must agree to the Terms & Conditions.");
    valid = false;
  }
    return valid;
  };


  const handleSignIn = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('profileImage', {
        uri: profileImage,
        type: 'image/jpeg',
        name: 'profile.jpg',
      });
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('phoneNumber', phoneNumber);
      formData.append('password', password);
      formData.append('country', JSON.stringify(country));
      formData.append('isAbove18', isAbove18);
      formData.append('isAgreedToTerms', isAgreedToTerms);

      const response = await fetch('http://192.168.1.103:3000/signup', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(login(data.user));
        Alert.alert('Success', 'Profile created successfully');
        navigate.push('ProfileCreated');
      } else if (response.status === 409) {
        // Handle duplicate user error
        Alert.alert('Error', 'User already exists');
      } else {
        setError(data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header onMenuToggle={toggleMenu} />

      {/* Overlay when menu is open */}
      {menuVisible && (
        <View style={styles.menuOverlay}>
          <Menu onClose={toggleMenu} />
        </View>
      )}

      {/* Scrollable Content */}
      <ScrollView style={[styles.content, menuVisible && { opacity: 0.5 }]}>
        <View style={styles.content}>
          {/* Top Section: Create Your Profile & Sign In */}
          <View style={styles.topSection}>
            <Text style={styles.createProfileText}>Create Your Profile</Text>
            <Link href="/Signin" style={styles.signInText}>
              Already have an account? <Text style={styles.signInLink}>Sign in</Text>
            </Link>
          </View>

          {/* Profile Section */}
          <View style={styles.profileSection}>
            <TouchableOpacity onPress={showImagePickerOptions}>
              <Image
                source={profileImage ? { uri: profileImage } : require('../../assets/icons/user3.png')}
                style={styles.profilePic}
              />
              <View style={styles.addProfileTextContainer}>
                <Icon name="camera" size={20} color="black" style={styles.iconStyle} />
                <Text style={styles.addProfileText}>Add a profile picture</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Text Inputs: First Name, Last Name, Email */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, !isFirstNameValid && styles.invalidInput]}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              onBlur={() => setIsFirstNameValid(!!firstName)}
            />
            <TextInput
              style={[styles.input, !isLastNameValid && styles.invalidInput]}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              onBlur={() => setIsLastNameValid(!!lastName)}
            />
            <TextInput
              style={[styles.input, !isEmailValid && styles.invalidInput]}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              onBlur={() => setIsEmailValid(email.includes('@'))}
            />
          </View>

          {/* Country Picker Section */}
          <TouchableOpacity style={styles.countryPicker} onPress={() => setPickerVisible(true)}>
            <Text style={styles.countryText}>
              {country.dialCode} {country.name} {country.flag}
            </Text>
            <Icon name="chevron-down" size={16} color="black" />
          </TouchableOpacity>

          {/* Country Picker Modal */}
          <CountryPicker
            show={isPickerVisible}
            pickerButtonOnPress={handleCountrySelection}
            onBackdropPress={() => setPickerVisible(false)}
          />

          {/* Text Inputs: Phone Number, Password, Confirm Password */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, !isPhoneNumberValid && styles.invalidInput]}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              onBlur={() => setIsPhoneNumberValid(!!phoneNumber)}
            />

            <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, !isPasswordValid && styles.invalidInput]}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
              onBlur={() => setIsPasswordValid(password.length >= 6)}
            />
             <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
              <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={20} color="gray" />
            </TouchableOpacity>
            </View>

            <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, !isConfirmPasswordValid && styles.invalidInput]}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!isConfirmPasswordVisible}
              onBlur={() => setIsConfirmPasswordValid(password === confirmPassword)}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={toggleConfirmPasswordVisibility}>
              <Ionicons name={isConfirmPasswordVisible  ? 'eye-off' : 'eye'} size={20} color="gray" />
            </TouchableOpacity>
            </View>
          </View>

          {/* Checkbox Section */}
          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxWrapper}>
              <Checkbox
                value={isAbove18}
                onValueChange={setIsAbove18}
                color={isAbove18 ? '#000000' : undefined}
              />
              <Text style={styles.checkboxText}>I agree that I am above the age of 18</Text>
            </View>
            <View style={styles.checkboxWrapper}>
              <Checkbox
                value={isAgreedToTerms}
                onValueChange={setIsAgreedToTerms}
                color={isAgreedToTerms ? '#000000' : undefined}
              />
              <Text style={styles.checkboxText}>I agree to the Terms & Conditions of FundPal</Text>
            </View>
          </View>

          {/* Terms & Conditions Link */}
          <TouchableOpacity>
            <Text style={styles.termsLink}>View Terms & Conditions</Text>
          </TouchableOpacity>

          {/* Create Profile Button */}
          <TouchableOpacity
            style={styles.createProfileButton}
            onPress={handleSignIn}
            disabled={loading}
          >
            {loading ? (
              <Text style={styles.createProfileText}>Loading...</Text>
            ) : (
              <Text style={styles.createProfileText}>Create Profile</Text>
            )}
          </TouchableOpacity>

          {/* Divider with "or" */}
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.line} />
          </View>

          {/* Google Sign-In Button */}
          <TouchableOpacity style={styles.googleButton}>
            <Image
              source={require('../../assets/icons/Google1.png')}
              style={styles.googleIcon}
            />
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
    marginTop: 10,
    backgroundColor: '#fff'
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    marginTop: 19,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  topSection: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  createProfileText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: fonts.ibold,
    color: 'black',
  },
  signInText: {
    marginTop: 8,
    fontSize: 16,
    color: 'black',
    fontFamily: fonts.iregular,
  },
  signInLink: {
    color: 'black',
    textDecorationLine: 'underline',
  },
  profileSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  addProfileTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  addProfileText: {
    fontSize: 12,
    fontFamily: fonts.iregular,
    textDecorationLine: 'underline',
    marginTop: 6,
    color: 'black',
    marginLeft: 6,
  },
  iconStyle: {
    marginLeft: 5,
    marginTop: 7,
  },
  countryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 20,
    backgroundColor: '#F1AF6933',
  },
  countryText: {
    fontSize: 15,
    fontFamily: fonts.iregular,
    color: 'black',
  },
  inputContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  passwordContainer: {
    position: 'relative',
  },
  input: {
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    fontFamily: fonts.iregular,
    backgroundColor: '#F1AF6933',
  },
  invalidInput: {
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 8,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 25,
  },
  checkboxContainer: {
    marginBottom: 20,
    marginLeft: 30,
    marginTop: 30,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxText: {
    fontSize: 13,
    fontFamily: fonts.iregular,
    marginLeft: 8,
    color: '#000000',
  },
  termsLink: {
    fontSize: 14,
    fontFamily: fonts.iregular,
    color: '#000000',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: -15,
  },
  createProfileButton: {
    backgroundColor: '#F1AF69',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginLeft: 20,
    width: 318,
    height: 56,
  },
  createProfileText: {
    fontSize: 20,
    fontFamily: fonts.iregular,
    color: 'black',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    marginHorizontal: 24,
  },
  orText: {
    fontSize: 16,
    fontFamily: fonts.iregular,
    marginHorizontal: 10,
  },
  googleButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: 318,
    height:56,
    marginLeft: 20,
  },
  googleIcon: {
    width: 40,
    height: 40,
  },
});

export default ProfileScreen;
