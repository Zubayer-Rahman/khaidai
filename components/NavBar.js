import { Link } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import colors from '../constants/Colors';

const NavBar = () => {
  return (
    <View style={styles.container}>
      {/* Regular Navigation Items */}
      <View style={styles.navItems}>
        <Link href="/HomeScreen" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Image 
              source={require('../assets/images/home-icon.png')} 
              style={styles.navIcon}
            />
          </TouchableOpacity>
        </Link>
        
        <Link href="/index" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Image 
              source={require('../assets/images/search-icon.png')} 
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </Link>
        
        {/* Empty space for the center button */}
        <View style={styles.emptySpace}></View>
        
        <Link href="/index" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Image 
              source={require('../assets/images/save-icon.png')} 
              style={styles.navIcon}
            />
          </TouchableOpacity>
        </Link>
        
        <Link href="/index" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Image 
              source={require('../assets/images/user-icon.png')} 
              style={styles.navIcon}
            />
          </TouchableOpacity>
        </Link>
      </View>
      
      {/* Floating Add Button */}
      <Link href="/index" asChild>
        <TouchableOpacity style={styles.addButton}>
          <Image 
            source={require('../assets/images/add-icon.png')} 
            style={styles.addIcon}
          />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
    marginTop: 10

  },
  navItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.grey3,
    paddingHorizontal: 20,
  },
  navItem: {
    padding: 10,
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  searchIcon:{
    tintColor: colors.grey2,
    width: 24,
    height: 24,
  },
  emptySpace: {
    width: 50, // Same as add button width
  },
  addButton: {
    position: 'absolute',
    top: -25,
    left: '50%',
    marginLeft: -25, // Half of width
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  addIcon: {
    width: 24,
    height: 24,
  },
});

export default NavBar;