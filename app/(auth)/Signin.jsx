import React, { useState, useEffect } from 'react';
import { View, Text, Image, StatusBar, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '../Header';
import Menu from '../Menu';
import { fonts } from '../../constants/fonts';
import { login } from '../../src/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter(); // For navigation

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '238713306220-mdra990acqna2h22pmo2j8uepdg4eiob.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    redirectUri: 'https://auth.expo.io/@abdullateef36/FundPal',
    scheme: 'myapp',
    useProxy: false,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      handleGoogleSignIn(authentication.accessToken);
    }
  }, [response]);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://192.168.1.103:3000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { token, user } = data; // Include user in response
        dispatch(login(user)); // Dispatch user info to Redux
        Alert.alert('Success', 'Signed in successfully!');
        router.push('/WelcomeMsg'); // Navigate to Welcome page
      } else {
        Alert.alert('Error', data.message || 'Invalid credentials.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async (accessToken) => {
    setLoading(true);
    try {
      const res = await fetch('http://192.168.211.14:3000/google-signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken }),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(login(data.user));
        Alert.alert('Success', 'Signed in with Google successfully!');
        router.push('/WelcomeMsg'); // Navigate to Welcome page
      } else {
        Alert.alert('Error', data.message || 'Failed to sign in with Google.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to the server.');
    } finally {
      setLoading(false);
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
        <View style={styles.signInContainer}>
          <Text style={styles.signInTitle}>Sign In</Text>
          <Text style={styles.signUpText}>
            Don't have an account? <Text style={styles.signUpLink} onPress={() => router.push('/Profile')}>Sign up</Text>
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email address"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Password"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
              <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={20} color="gray" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <Text style={styles.forgotPasswordText} onPress={() => router.push('/ForgetPassword')}>
              Forgot password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.signInButtonText}>Sign in</Text>}
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity style={styles.googleButton} onPress={() => promptAsync()} disabled={!request || loading}>
            <Image source={require('../../assets/icons/Google1.png')} style={styles.googleIcon}/>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
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
  signInContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  signInTitle: {
    fontSize: 22,
    fontFamily: fonts.ibold,
    marginBottom: 10,
    color: 'black',
  },
  signUpText: {
    fontSize: 16,
    fontFamily: fonts.iregular,
    color: 'black',
    marginBottom: 20,
  },
  signUpLink: {
    color: 'black',
    textDecorationLine: 'underline',
  },
  input: {
    backgroundColor: '#F1AF6933',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 30,
    fontSize: 16,
    fontFamily: fonts.iregular,
    color: 'black',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 40, // Space for eye icon
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  forgotPasswordText: {
    color: 'black',
    fontSize: 16,
    fontFamily: fonts.iregular,
    textDecorationLine: 'underline',
    marginBottom: 40,
    marginTop: -20,
  },
  signInButton: {
    backgroundColor: '#F1AF69',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: 318,
    height: 56,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: fonts.ibold,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#000',
  },
  orText: {
    marginHorizontal: 10,
    color: 'gray',
  },
  googleButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 318,
    height: 56,
  },
  googleIcon: {
    width: 40,
    height: 40,
  },
});

export default SignIn;