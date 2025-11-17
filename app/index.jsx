import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, Image, ImageBackground, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import Header from './Header';
import Menu from './Menu';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { fonts } from "../constants/fonts";
import { useSelector } from 'react-redux';

const testimonials = [
  {
    id: '1',
    name: 'James K.',
    location: 'Abuja, Nigeria',
    review: 'Amazing! I would like to personally thank you for your outstanding product. Absolutely wonderful!',
    image: require('../assets/images/image1.jpg'),
  },
  {
    id: '2',
    name: 'Megen W.',
    location: 'Atlanta, USA',
    review: 'Just what I was looking for. Thank you for making such a beautiful and long-lasting product.',
    image: require('../assets/images/image.jpg'),
  },
  {
    id: '3',
    name: 'Susan B.',
    location: 'Lagos, Nigeria',
    review: 'Enduring would be a fitting word related to this sentiment, as it reflects the long-lasting and durable nature of the product',
    image: require('../assets/images/image2.jpg'),
  },
];

const SCREEN_WIDTH = Dimensions.get('window').width;


const MainScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderTestimonialItem = ({ item }) => (
    <View style={styles.carouselItem}>
    {/* Text and Star Ratings Container */}
    <View style={styles.textCouraselContainer}>
      <Text style={styles.testimonialReview}>{`"${item.review}"`}</Text>

      {/* Star Ratings Section */}
      <View style={styles.starContainer}>
        {Array(5).fill().map((_, index) => (
          <Icon key={index} name="star" size={16} color="#000000" />
        ))}
      </View>

      {/* Divider Line */}
      <View style={styles.dividerLine} />

      {/* Testimonial Name */}
      <Text style={styles.testimonialName}>{item.name}</Text>

      {/* Testimonial Location */}
      <Text style={styles.testimonialLocation}>{item.location}</Text>
    </View>

    {/* Image on the right */}
    <Image source={item.image} style={styles.testimonialImage} />
  </View>
  );

  const scrollToNext = () => {
    const nextIndex = activeIndex + 1 < testimonials.length ? activeIndex + 1 : 0;
    setActiveIndex(nextIndex);
    flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
  };

  const scrollToPrev = () => {
    const prevIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : testimonials.length - 1;
    setActiveIndex(prevIndex);
    flatListRef.current.scrollToIndex({ animated: true, index: prevIndex });
  };

  return (
    <View style={styles.container}>
      <Header onMenuToggle={toggleMenu} />
      {menuVisible && (
        <View style={styles.menuContainer}>
          <Menu onClose={toggleMenu} />
        </View>
      )}

      <ScrollView>
      <View style={styles.content}>
        <ImageBackground source={require('../assets/images/frame2.jpg')} style={styles.imageBackground}>
            <Text  style={styles.headingText}>CREATE HAPPINESS FOR YOU AND OTHERS</Text>
          </ImageBackground>

        <View>
        {!isAuthenticated && (
        <TouchableOpacity style={styles.startFundButton}>
            <Link href="/Profile" style={styles.startFundButtonText}>Start a Fund</Link>
          </TouchableOpacity>
        )}
        </View>

        <Text style={styles.sectionTitle}>FUNDRAISERS</Text>

        <View style={styles.fundraiserItem}>
          <Image source={require('../assets/images/PhotoCard.png')} style={styles.fundraiserImage} />
          <View style={styles.fundraiserTextContainer}>
            <Text style={styles.fundraiserTitle}>Help Ada fund her wedding</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: '40%' }]} />
            </View>
            <Text style={styles.fundraiserAmount}>₦589,000 raised</Text>
          </View>
        </View>

        <View style={styles.fundraiserItem}>
          <Image source={require('../assets/images/PhotoCard1.png')} style={styles.fundraiserImage} />
          <View style={styles.fundraiserTextContainer}>
            <Text style={styles.fundraiserTitle}>Support Tara in her fight against cancer</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: '80%' }]} />
            </View>
            <Text style={styles.fundraiserAmount}>₦1,234,000 raised</Text>
          </View>
        </View>

        <View style={styles.fundraiserItem}>
          <Image source={require('../assets/images/PhotoCard2.png')} style={styles.fundraiserImage} />
          <View style={styles.fundraiserTextContainer}>
            <Text style={styles.fundraiserTitle}>Help my family escape from Gaza</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: '50%' }]} />
            </View>
            <Text style={styles.fundraiserAmount}>₦123,400 raised</Text>
          </View>
        </View>

        <View style={styles.fundraiserItem}>
          <Image source={require('../assets/images/PhotoCard3.png')} style={styles.fundraiserImage} />
          <View style={styles.fundraiserTextContainer}>
            <Text style={styles.fundraiserTitle}>Help me plan my birthday party</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: '90%' }]} />
            </View>
            <Text style={styles.fundraiserAmount}>₦8,910 raised</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.exploreMoreButton}>
            <Text style={styles.exploreMoreTextButton}>EXPLORE MORE</Text>
          </TouchableOpacity>

          <ImageBackground source={require('../assets/images/frame3.jpg')} style={styles.bottomBackground}>
            <Text  style={styles.topheadingText}>GET STARTED TODAY</Text>
            <Text style={styles.subheadingText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</Text>
          </ImageBackground>

        <View>
        {!isAuthenticated && (
        <TouchableOpacity style={styles.startFundButton}>
            <Link href="/Profile" style={styles.startFundButtonText}>Sign up</Link>
          </TouchableOpacity>
        )}
          </View>


         {/* Supported Dreams Section */}
         <View style={styles.orangeCarouselContainer}>
         <Text style={styles.sectionCarouselTitle}>Supported Dreams</Text>
          <Text style={styles.sectionSubtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis</Text>

          {/* Testimonials Carousel */}
          <FlatList
            data={testimonials}
            renderItem={renderTestimonialItem}
            keyExtractor={(item) => item.id}
            horizontal
            ref={flatListRef}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContainer}
            onMomentumScrollEnd={(event) => {
              const index = Math.floor(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
              setActiveIndex(index);
            }}
          />

          {/* Navigation Arrows */}
          <View style={styles.navigationContainer}>
            <TouchableOpacity onPress={scrollToPrev} style={styles.navCarouselButton}>
              <View style={styles.arrowCircle}>
                <Text style={styles.navButtonText}>{"<"}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={scrollToNext} style={styles.navCarouselButton}>
              <View style={styles.arrowCircle}>
                <Text style={styles.navButtonText}>{">"}</Text>
              </View>
            </TouchableOpacity>
          </View>
          </View>
      </View>

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
    backgroundColor: '#fff',
    marginTop: 19,
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
  imageBackground: {
    width: '100%',
    height: 256,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  headingText: {
    color: '#fff',
    fontSize: 24,
    fontFamily: fonts.ibold,
    textAlign: 'center',
    marginBottom: 150,
  },
  image: {
    width: 390,
    height: 256,
    marginTop: 30,
  },
  startFundButton: {
    backgroundColor: '#F1AF69',
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf: 'center',
    borderRadius: 6,
    marginTop: -70,
    marginBottom: 20,
  },
  startFundButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.ibold,
    textAlign: 'center',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fonts.ibold,
    marginTop: 25,
  },
  fundraiserItem: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingLeft: 15,
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
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  exploreMoreTextButton: {
    fontSize: 16,
    fontFamily: fonts.ibold,
    color: '#FFFFFF',
  },
  bottomBackground: {
    width: '100%',
    height: 256,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topheadingText: {
    fontSize: 24,
    fontFamily: fonts.ibold,
    color: '#FFFFFF',
    marginTop: -65,
  },
  subheadingText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.iregular,
    flexWrap: 'wrap',
    width: '90%',
    textAlign: 'center',
    lineHeight: 40,
  },


  orangeCarouselContainer: {
    backgroundColor: '#F1AF6969',
    paddingBottom: 20,
    marginTop: 30,
  },
  sectionCarouselTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: fonts.ibold,
    marginTop: 25,
  },
  sectionSubtitle: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fonts.iregular,
    color: '#6E6E6E',
    marginBottom: 20,
  },
  carouselContainer: {
    alignItems: 'center',
  },
  carouselItem: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_WIDTH * 0.7,
    flexDirection: 'row-reverse',
    alignItems: 'left',
    padding: 20,
    backgroundColor: '#fff',
    marginHorizontal: SCREEN_WIDTH * 0.05,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  testimonialImage: {
    width: 120,
    height: 160,
    marginTop: 30,
  },
  textCouraselContainer: {
    flex: 1,
    marginRight: -20, // Adjust space between text and image
    marginTop: 20,
    alignItems: 'center'
  },
  testimonialReview: {
    fontFamily: fonts.pregular,
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },

  // Divider Line - Added
  dividerLine: {
    height: 1,
    backgroundColor: '#000000',
    marginVertical: 8,
    width: '50%',
  },

  testimonialName: {
    fontFamily: fonts.rvolkhov,
    fontSize: 20,
    textAlign: 'center',
    color: '#333',
    marginTop: 0,
  },
  testimonialLocation: {
    fontFamily: fonts.pregular,
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
    marginTop: 5,
  },

  // Star Rating Style - Added
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 0,
  },

  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  navCarouselButton: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 30,
  },
  arrowCircle: {
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 26,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
  },

   // Footer
  containerFooter: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
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

export default MainScreen;