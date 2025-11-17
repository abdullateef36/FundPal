import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import Header from '../Header';
import Menu from '../Menu';
import { fonts } from "../../constants/fonts";
import { useNavigation  } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';


const MyFund = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigate = useNavigation();


  return (
    <View style={styles.container}>
      {/* Header */}
      <Header onMenuToggle={toggleMenu} />

      {/* Menu */}
      {menuVisible && (
        <View style={styles.menuContainer}>
          <Menu onClose={toggleMenu} />
        </View>
      )}

      {/* Scrollable Content */}
      <ScrollView style={[styles.content, menuVisible && { opacity: 0.5 }]}>
        <View style={styles.fundCard}>

            <View>
              <Image source={require('../../assets/images/wedding.png')} style={styles.fundImage} />
              <Text style={styles.fundTitle}>Support Ada as she plans her wedding</Text>
              <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: '40%' }]} />
             </View>
              <View style={styles.fundStatsContainer}>
                <Text style={styles.raisedAmount}>₦589,000 raised</Text>
                <Text style={styles.goalAmount}>Goal: ₦1,800,000</Text>
                <TouchableOpacity style={styles.shareButton}>
                <Text style={styles.shareButtonText}>Tell a friend</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.editButton} onPress={() => {navigate.push('Payment')}}>
                <Text style={styles.editButtonText}>Support</Text>
              </TouchableOpacity>
              </View>
              <View style={styles.separator} />
              <Text style={styles.descriptionHeader}>Description</Text>
              <Text style={styles.description}>
                Consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
                sed quia non numquam.
              </Text>
              <TouchableOpacity style={styles.readMoreButton}>
                <Text style={styles.readMoreText}>Read more</Text>
              </TouchableOpacity>
              <View style={styles.containerButton}>
              <TouchableOpacity style={[styles.button, styles.leftButton]}>
                <Text style={styles.buttonText}>Tell a friend</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.rightButton]} onPress={() => {navigate.push('Payment')}}>
                <Text style={styles.buttonText}>Support</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator} />

            <View style={styles.containerFooter}>
              <Text style={styles.textFooter}>Support Others</Text>
              <TouchableOpacity>
                <Text style={styles.linkFooter}>Terms of Use</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.linkFooter}>Privacy Policy</Text>
              </TouchableOpacity>
              <View style={styles.iconsFooter}>
                <FontAwesome name="facebook" size={28} color="#000000" />
                <FontAwesome name="whatsapp" size={28} color="#000000" />
                <FontAwesome name="twitter" size={28} color="#000000" />
                <FontAwesome name="instagram" size={28} color="#000000" />
              </View>
              <Text style={styles.copyrightFooter}>All rights reserved</Text>
            </View>
            </View>
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
  fundImage: {
    width: '100%',
    height: 231,
    marginBottom: 10,
  },
  fundTitle: {
    fontSize: 20,
    fontFamily: fonts.ibold,
    marginBottom: 20,
  },
  progressBarContainer: {
    height: 3,
    width: 270,
    backgroundColor: '#F1AF69',
    marginTop: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'black',
  },
  fundStatsContainer: {
    justifyContent: 'space-between',
    alignItems: 'left',
    marginBottom: 8,
  },
  raisedAmount: {
    fontSize: 22,
    fontFamily: fonts.iregular,
    color: '#00',
    marginTop: 10,
  },
  goalAmount: {
    fontSize: 20,
    color: '#00000099',
    marginTop: 15,
  },
  shareButton: {
    width: 150,
    height: 50,
    marginTop: 30,
    backgroundColor: '#F1AF69',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center'
  },
  shareButtonText: {
    fontSize: 16,
    fontFamily: fonts.ibold,
    color: '#fff',
    justifyContent: 'center',
  },
  editButton: {
    width: 150,
    height: 50,
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: '#F1AF69',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
  },
  editButtonText: {
    fontSize: 16,
    fontFamily: fonts.ibold,
    color: '#fff',
    justifyContent: 'center',
  },
  separator: {
    borderBottomWidth: 2,
    borderBottomColor: '#EAEAEA',
    marginVertical: 10,
  },
  descriptionHeader: {
    fontSize: 18,
    fontFamily: fonts.ibold,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: '#00000099',
  },
  readMoreButton: {
    marginTop: 25,
  },
  readMoreText: {
    fontSize: 18,
    fontFamily: fonts.iregular,
    textDecorationLine: 'underline',
    color: '#000',
    marginBottom: 20,
  },
  containerButton: {
    flexDirection: 'row',  // Side by side layout
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F1AF69',
    borderRadius: 5,
    marginBottom: 15,
  },
  leftButton: {
    width: 120,  // Makes the left button longer
    height: 48,
    marginRight: 15,
    alignSelf: 'center',
    marginLeft: -20
  },
  rightButton: {
    width: 180,  // Makes the right button shorter
    height: 48,
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: fonts.ibold,
    color: 'white',
    fontSize: 14,
    justifyContent: 'center',
  },

  // Footer
  containerFooter: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  textFooter: {
    fontSize: 18,
    fontFamily: fonts.iregular,
    color: '#000000',
    marginBottom: 10,
  },
  linkFooter: {
    fontSize: 18,
    fontFamily: fonts.iregular,
    color: '#000000',
    marginVertical: 10,
  },
  iconsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
    marginVertical: 20,
  },
  copyrightFooter: {
    fontSize: 12,
    fontFamily: fonts.iregular,
    color: '#000000',
  },
});

export default MyFund;