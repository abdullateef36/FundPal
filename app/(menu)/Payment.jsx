import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RadioButton, Checkbox } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons'; // Import for icons
import Header from '../Header';
import Menu from '../Menu';
import { fonts } from "../../constants/fonts";
import { useNavigation  } from 'expo-router';

const Payment = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [checked, setChecked] = useState('card'); // to track selected payment method
  const [useShippingAsBilling, setUseShippingAsBilling] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigate = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header onMenuToggle={toggleMenu} />
      {menuVisible && (
        <View style={styles.menuContainer}>
          <Menu onClose={toggleMenu} />
        </View>
      )}

      <ScrollView style={[styles.content, menuVisible && { opacity: 0.5 }]}>
        <View style={styles.paymentContainer}>
          <Text style={styles.title}>Payment</Text>
          <Text style={styles.subTitle}>All transactions are secure and encrypted</Text>

          {/* Payment Methods */}
          <View style={styles.paymentMethodContainer}>
            <View style={styles.radioGroup}>
              <RadioButton
                value="card"
                status={checked === 'card' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('card')}
              />
              <View style={styles.paymentLabelContainer}>
                {/* Payment images at the front */}
                <Text style={styles.radioLabel}>Credit or debit card</Text>
                <Image source={require('../../assets/icons/visa.png')} style={styles.paymentIcon} />
                <Image source={require('../../assets/icons/mastercard.png')} style={styles.paymentIcon} />
                <Image source={require('../../assets/icons/amex.png')} style={styles.paymentIcon} />
              </View>
            </View>

            {/* Card Input Fields with Icons */}
            <View style={styles.inputGroup}>
              <MaterialIcons name="lock" size={20} color="gray" style={styles.inputIconInside} />
              <TextInput style={[styles.input]} placeholder="Card number" keyboardType="numeric" />
            </View>
            <TextInput style={styles.input} placeholder="Expiration date (MM/YY)" keyboardType="numeric" />

            <View style={styles.inputGroup}>
              <MaterialIcons name="help-outline" size={20} color="gray" style={styles.inputIconInside} />
              <TextInput style={[styles.input]} placeholder="Security code" keyboardType="numeric" />
            </View>

            <TextInput style={styles.input} placeholder="Name on card" />

            {/* Checkbox for Shipping Address */}
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={useShippingAsBilling ? 'checked' : 'unchecked'}
                onPress={() => setUseShippingAsBilling(!useShippingAsBilling)}
              />
              <Text style={styles.checkboxLabel}>Use shipping address as billing address</Text>
            </View>

            {/* Other Payment Methods */}
            <View style={[styles.radioGroup, styles.otherPaymentMethod]}>
              <RadioButton
                value="paypal"
                status={checked === 'paypal' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('paypal')}
              />
              <Text style={styles.radioLabel}>PayPal</Text>
              <Image source={require('../../assets/icons/Paypal.png')} style={styles.paymentIconTwo} />
            </View>

            <View style={[styles.radioGroup, styles.otherPaymentMethod]}>
              <RadioButton
                value="shopPay"
                status={checked === 'shopPay' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('shopPay')}
              />
              <Text style={styles.radioLabel}>Shop Pay</Text>
              <Image source={require('../../assets/icons/ShopPay.png')} style={styles.paymentIconTwo} />
            </View>
        </View>
                {/* Checkbox for Remember Me */}
                <Text style={styles.rememberText}>Remember Me</Text>
                 <View style={styles.infoContainer}>
                    <Checkbox
                      status={rememberMe ? 'checked' : 'unchecked'}
                      onPress={() => setRememberMe(!rememberMe)}
                    />
                    <Text style={styles.checkboxText}>Save my information for a faster checkout</Text>
                  </View>

            {/* Pay Now Button */}
            <TouchableOpacity style={styles.payButton} onPress={() => {navigate.push('Supported')}}>
              <Text style={styles.payButtonText}>Pay now</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
    </SafeAreaView>
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
  },
  content: {
    flex: 1,
    zIndex: -1,
  },
  paymentContainer: {
    padding: 20,
  },
  title: {
    fontFamily: fonts.iregular,
    fontSize: 22,
    marginBottom: 10,
  },
  subTitle: {
    fontFamily: fonts.iregular,
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  paymentMethodContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 16,
  },
  paymentIcon: {
    width: 30, // Adjust size for smaller images
    height: 20,
    marginHorizontal: 5,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 15,
    position: 'relative',
  },
  inputIconInside: {
    position: 'absolute',
    right: 10,
    top: 18,
    zIndex: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -2,
  },
  paymentIconTwo: {
    resizeMode: 'contain',
    width: 60,
    height: 17,
    marginHorizontal: 110,
  },
  checkboxLabel: {
    fontFamily: fonts.ibold,
    fontSize: 13,
  },
  otherPaymentMethod: {
    backgroundColor: '#fff', // White background for PayPal and Shop Pay
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    margin: -12,
  },
  rememberText: {
    fontFamily: fonts.iregular,
    fontSize: 17.63,
    marginTop: 30,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 10,
    backgroundColor: '#fff', // White background for PayPal and Shop Pay
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  checkboxText: {
    fontFamily: fonts.iregular,
    fontSize: 14.52,
    width: '80%',
    flexWrap: 'wrap',
  },
  payButton: {
    backgroundColor: '#f4a261',
    height: 48,
    width: 197,
    marginLeft: 60,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonText: {
    fontFamily: fonts.ibold,
    color: '#fff',
    fontSize: 16,
  },
});

export default Payment;
