import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import colors from '../constants/Colors';
const { width, height } = Dimensions.get('window');

const SearchBar = ({ searchText, onSearchChange = () => {} }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;
  const router = useRouter();
  const searchInputRef = useRef(null);
  
  useEffect(() => {
    if (menuVisible) {
      ScrollView.defaultProps = {
        ...ScrollView.defaultProps,
        scrollEnabled: false,
      };
    } else {
      ScrollView.defaultProps = {
        ...ScrollView.defaultProps,
        scrollEnabled: true,
      };
    }
    return () => {
      ScrollView.defaultProps = {
        ...ScrollView.defaultProps,
        scrollEnabled: true,
      };
    };
  }, [menuVisible]);

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
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start();
    }
  };
  const handleChangeText = (text) => {
    onSearchChange(text);
    if (text.length > 0 && !hasUserInteracted) {
      setHasUserInteracted(true);
      router.push({
        pathname: '/search',
        params: { initialSearch: text }
      });
    }
  };

  const handleFocus = () => { 
    searchInputRef.current?.focus();
  };
  return (
    <>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <Image 
            source={require('../assets/images/search-icon.png')} 
            style={styles.searchIcon}
            resizeMode="contain"
          />
          <TextInput
            ref={searchInputRef}
            style={styles.input}
            placeholder="Search..."
            placeholderTextColor={colors.grey3}
            value={searchText}
            onChangeText={handleChangeText}
            returnKeyType="search"
            clearButtonMode="while-editing" 
            onFocus={handleFocus}
            // showSoftInputOnFocus={false}
            autoFocus={false}
          />
        </View>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={toggleMenu}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <View style={{width: 40, height: 40, backgroundColor: colors.primary100, alignItems: 'center', justifyContent: 'center', borderRadius: 10}}>
            <Image 
              source={require('../assets/images/setting.png')} 
              style={styles.filterIcon}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>

      {menuVisible && (
        <>
          <TouchableOpacity 
            style={[StyleSheet.absoluteFill, styles.overlay]}
            activeOpacity={1}
            onPress={toggleMenu}
          />
        </>
      )}
      <Animated.View style={[
        styles.menuContainer,
        { transform: [{ translateX: slideAnim }] }
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
    width: 20,
    height: 20,
    tintColor: colors.white
  },
  menuContainer: {
    position: 'absolute',
    top: 100,
    left: 0,
    bottom: 0,
    width: width * 0.95,
    height:660,
    backgroundColor: colors.primary100,
    zIndex: 2,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    padding: 30,
    borderRadius: 20,
    scrollBehavior (to, from, savedPosition) {
      // ...
    }
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 1,
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
    color: colors.primary100,
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
    color: colors.primary100,
    fontSize: 14,
  },
  rateContainer: {
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
    color: colors.primary100,
    fontSize: 14,
  },
});

export default SearchBar;