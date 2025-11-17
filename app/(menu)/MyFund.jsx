import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import Header from '../Header';
import Menu from '../Menu';
import { fonts } from "../../constants/fonts";
import { useNavigation  } from 'expo-router';


const MyFund = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Active'); // State to track active tab
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
            <View style={styles.tabContent}>
              <Image source={require('../../assets/images/wedding.png')} style={styles.fundImage} />
              <Text style={styles.fundTitle}>Support Ada as she plans her wedding</Text>
              <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: '40%' }]} />
             </View>
              <View style={styles.fundStatsContainer}>
                <Text style={styles.raisedAmount}>₦589,000 raised</Text>
                <Text style={styles.goalAmount}>Goal: ₦1,800,000</Text>
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
              <View style={styles.separator} />
              <Text style={styles.bankDetailsTitle}>Donation method: Bank Transfer</Text>
              <Text style={styles.bankDetail}>Bank Name: Access Bank</Text>
              <Text style={styles.bankDetail}>Account Number: 1438525125</Text>
              <Text style={styles.bankDetail}>Account Name: Aharanwa Precious Adaku</Text>
              <TouchableOpacity style={styles.moreFundsButton}>
                <Text style={styles.moreFundsText}>More funds</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareButton} onPress={handleModalToggle}>
                <Text style={styles.shareButtonText}>Share Fund Link</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.editButton} onPress={() => {navigate.push('StartAFund')}}>
                <Text style={styles.editButtonText}>Edit Fund</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.fundraiserContainer}>
            <View style={styles.fundraiserItem}>
            <Image source={require('../../assets/images/PhotoCard.png')} style={styles.fundraiserImage} />
            <View style={styles.fundraiserTextContainer}>
              <Text style={styles.fundraiserTitle}>Help Ada fund her wedding</Text>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: '40%' }]} />
              </View>
              <Text style={styles.fundraiserAmount}>₦589,000 raised</Text>
            </View>
          </View><View style={styles.fundraiserItem}>
              <Image source={require('../../assets/images/PhotoCard1.png')} style={styles.fundraiserImage} />
              <View style={styles.fundraiserTextContainer}>
                <Text style={styles.fundraiserTitle}>Support Tara in her fight against cancer</Text>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: '80%' }]} />
                </View>
                <Text style={styles.fundraiserAmount}>₦1,234,000 raised</Text>
              </View>
            </View><View style={styles.fundraiserItem}>
              <Image source={require('../../assets/images/PhotoCard2.png')} style={styles.fundraiserImage} />
              <View style={styles.fundraiserTextContainer}>
                <Text style={styles.fundraiserTitle}>Help my family escape from Gaza</Text>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: '50%' }]} />
                </View>
                <Text style={styles.fundraiserAmount}>₦123,400 raised</Text>
              </View>
            </View><View style={styles.fundraiserItem}>
              <Image source={require('../../assets/images/PhotoCard3.png')} style={styles.fundraiserImage} />
              <View style={styles.fundraiserTextContainer}>
                <Text style={styles.fundraiserTitle}>Help me plan my birthday party</Text>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: '90%' }]} />
                </View>
                <Text style={styles.fundraiserAmount}>₦8,910 raised</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.exploreMoreButton} onPress={() => {navigate.push('StartAFund')}}>
              <Text style={styles.exploreMoreTextButton}>Start New Fund</Text>
            </TouchableOpacity>
            </View>
          )}
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
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#F1AF69',
    width: '50%',
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
  tabContent: {
    marginTop: 10,
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
    fontSize: 14,
    color: '#00000099',
    marginTop: 15,
  },
  separator: {
    borderBottomWidth: 1,
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
  },
  bankDetailsTitle: {
    fontSize: 18,
    fontFamily: fonts.ibold,
    marginBottom: 20,
  },
  bankDetail: {
    fontSize: 18,
    fontFamily: fonts.iregular,
    color: '#000',
    margin: 10,
  },
  shareButton: {
    marginTop: 20,
    backgroundColor: '#F1AF69',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareButtonText: {
    fontSize: 16,
    fontFamily: fonts.ibold,
    color: '#fff',
    justifyContent: 'center',
  },
  editButton: {
    marginTop: 20,
    backgroundColor: '#F1AF69',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    fontFamily: fonts.ibold,
    color: '#fff',
    justifyContent: 'center',
  },
  moreFundsButton: {
    marginTop: 10,
  },
  moreFundsText: {
    fontSize: 16,
    fontFamily: fonts.iregular,
    color: '#000',
    textDecorationLine: 'underline',
    textAlign: 'right',
  },
  completeText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },

  fundraiserContainer: {
    marginLeft: -10,
  },
  fundraiserItem: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingLeft: 10,
  },
  fundraiserImage: {
    width: 123,
    height: 150,
    marginRight: 10,
    borderRadius: 8,
    marginTop: 30,
    borderRadius: 8,
  },
  fundraiserTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  fundraiserTitle: {
    fontSize: 16,
    fontFamily: fonts.ibold,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  progressBarContainer: {
    height: 2,
    width: 174,
    backgroundColor: '#F1AF69',
    marginTop: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'black',
  },
  fundraiserAmount: {
    fontSize: 12,
    fontFamily: fonts.iregular,
    color: '#000000',
    marginTop: 5,
  },
  exploreMoreButton: {
    backgroundColor: '#F1AF69',
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 20,
    width: '100%',
    height: 49,
  },
  exploreMoreTextButton: {
    fontSize: 16,
    fontFamily: fonts.ibold,
    textAlign: 'center',
    color: '#FFFFFF',
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

export default MyFund;