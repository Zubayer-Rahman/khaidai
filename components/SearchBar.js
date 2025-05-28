import { useRef, useState } from 'react';
import { Animated, Dimensions, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import colors from '../constants/Colors';
const { width, height } = Dimensions.get('window');

const SearchBar = ({ searchText, onSearchChange }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;
  
  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0, // Animates to bottom of screen
        duration: 300,
        useNativeDriver: true
      }).start();
    }
  };
  
  return (
    <>
      {/* Regular search bar that scrolls with content */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <Image 
            source={require('../assets/images/search-icon.png')} 
            style={styles.searchIcon}
            resizeMode="contain"
          />
          <TextInput
            style={styles.input}
            placeholder="Search..."
            placeholderTextColor={colors.grey3}
            value={searchText}
            onChangeText={onSearchChange}
            returnKeyType="search"
            clearButtonMode="while-editing" 
          />
        </View>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={toggleMenu}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <View style={styles.filterIconContainer}>
            <Image 
              source={require('../assets/images/setting.png')} 
              style={styles.filterIcon}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Filter menu - rendered at root level */}
      {menuVisible && (
        <>
          <TouchableOpacity 
            style={[StyleSheet.absoluteFill, styles.overlay]}
            activeOpacity={1}
            onPress={toggleMenu}
          />
          
          <Animated.View style={[
            styles.menuContainer,
            { 
              transform: [{ translateY: slideAnim }],
              // These ensure it stays fixed during scroll
              position: 'absolute',
              bottom: 0,
            }
          ]}>
            <View style={styles.menuHeader}>
              <Text style={styles.filterText}>Filter Search</Text>
              <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
                <Text style={styles.closeText}>×</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>Time</Text>
              <View style={styles.timeButtonContainer}>
                <Pressable style={styles.timeButton}>
                  <Text style={styles.timeButtonText}>All</Text>
                </Pressable>
                <Pressable style={styles.timeButton}>
                  <Text style={styles.timeButtonText}>Newest</Text>
                </Pressable>
                <Pressable style={styles.timeButton}>
                  <Text style={styles.timeButtonText}>Oldest</Text>
                </Pressable>
                <Pressable style={styles.timeButton}>
                  <Text style={styles.timeButtonText}>Popularity</Text>
                </Pressable>
              </View>
            </View>
            
            <View style={styles.rateContainer}>
              <Text style={styles.rateText}>Rating</Text>
              <View style={styles.rateButtonContainer}>
                <Pressable style={styles.rateButton}>
                  <Text style={styles.rateButtonText}>5 ★</Text>
                </Pressable>
                <Pressable style={styles.rateButton}>
                  <Text style={styles.rateButtonText}>4 ★</Text>
                </Pressable>
                <Pressable style={styles.rateButton}>
                  <Text style={styles.rateButtonText}>3 ★</Text>
                </Pressable>
                <Pressable style={styles.rateButton}>
                  <Text style={styles.rateButtonText}>2 ★</Text>
                </Pressable>
                <Pressable style={styles.rateButton}>
                  <Text style={styles.rateButtonText}>1 ★</Text>
                </Pressable>
              </View>
            </View>
          </Animated.View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8, 
    borderWidth: 1.4,
    borderColor: colors.grey3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2, 
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    paddingVertical: 0, 
  },
  filterButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: colors.white, 
    borderRadius: 10,
  },
  filterIcon: {
    flex: 1,
    width: 20,
    height: 20,
    tintColor: colors.white
  },
  menuContainer: {
    width: '100%',
    height: 400,
    backgroundColor: colors.primary80,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  overlay: {
    // backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 24,
    color: colors.primary80,
    lineHeight: 28,
  },
  timeContainer: {
    marginBottom: 20,
  },
  timeText: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 10,
  },
  timeButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeButton: {
    backgroundColor: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  timeButtonText: {
    color: colors.primary80,
    fontSize: 14,
  },
  rateContainer:{
    marginBottom: 20,
  },
  rateText: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 10,
  },
  rateButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  rateButton: {
    backgroundColor: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  rateButtonText: {
    color: colors.primary80,
    fontSize: 14,
  },
  filterContainer:{
    width: 174,
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20
  },
  filter:{
    color: colors.primary100,
    alignSelf: 'center',
    padding: 15

  }

});

export default SearchBar;