import { View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';
import { useSelector } from 'react-redux';
import { selectAuth } from '../src/redux/slices/authSlice';

const Header = ({ onMenuToggle }) => {
  const navigate = useNavigation();
  const { isAuthenticated } = useSelector(selectAuth); // Access login state from Redux

  return (
    <View style={styles.headerContainer}>
      {/* Logo */}
        <TouchableOpacity onPress={() => { navigate.push('index');}}>
          <Image source={require('../assets/icons/logo4.png')} style={styles.logo} />
        </TouchableOpacity>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={15} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
        />
      </View>

      {/* Icons */}
      <View style={styles.iconContainer}>
        {/* Home Icon */}
          <TouchableOpacity onPress={() => { navigate.push('index');}}>
            <Ionicons name="home-outline" size={24} color="black" />
          </TouchableOpacity>


        {/* Profile Icon */}
        <Link href={isAuthenticated ? "/UserInfo" : "/Profile"} asChild>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name="person-outline" size={24} color="black" />
          </TouchableOpacity>
        </Link>

        {/* Menu Icon */}
        <TouchableOpacity style={styles.icon} onPress={onMenuToggle}>
          <Ionicons name="menu-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    marginTop: 23,
  },
  logo: {
    width: 60,
    height: 23,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginLeft: 10,
    marginRight: 5,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchBar: {
    flex: 1,
    fontSize: 12,
    paddingVertical: -3, // Adjust this for vertical padding
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
  },
});

export default Header;
