import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Header from '../Header';
import Menu from '../Menu';
import { fonts } from "../../constants/fonts";
import { Link } from 'expo-router';

const ForgetPassword = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [email, setEmail] = useState('');

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleSendLink = () => {
    // Logic to send reset password link
    console.log('Reset link sent to:', email);
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
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subText}>Enter your email and we will send you a reset link</Text>

          <TextInput
            style={styles.input}
            placeholder="Email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.button} onPress={handleSendLink}>
            <Link href="/ConfirmationEmail" style={styles.buttonText}>Send me the link</Link>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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
  innerContainer: {
    padding: 20,
    alignItems: 'left',
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.ibold,
    marginBottom: 20,
  },
  subText: {
    fontSize: 16,
    fontFamily: fonts.iregular,
    color: '#888',
    marginBottom: 45,
    textAlign: 'left',
  },
  input: {
    width: '100%',
    backgroundColor: '#F1AF6933',
    padding: 12,
    borderRadius: 8,
    marginBottom: 40,
    fontSize: 16,
    fontFamily: fonts.iregular,
  },
  button: {
    width: '100%',
    backgroundColor: '#F1AF69',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 318,
    height: 56,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontFamily: fonts.iregular,
  },
});

export default ForgetPassword;
