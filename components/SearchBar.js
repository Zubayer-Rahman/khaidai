import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import colors from '../constants/Colors';

const SearchBar = ({ searchText, onSearchChange, onFilterPress }) => {
  return (
    <View style={styles.searchBarContainer}>
      <View style={styles.searchBar}>
        <Image 
          source={require('../assets/images/search-icon.png')} // Changed to PNG
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
          clearButtonMode="while-editing" // iOS only
        />
      </View>
      <TouchableOpacity 
        style={styles.filterButton}
        onPress={onFilterPress}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Image 
          source={require('../assets/images/Filter.png')} 
          style={styles.filterIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 15, // Added for better spacing
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8, // Slightly reduced
    borderWidth: 1,
    borderColor: colors.grey3,
    shadowColor: colors.black, // For iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2, // For Android
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: colors.grey3, // Optional: if you want to color the icon
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    paddingVertical: 0, // Ensures consistent height on different devices
  },
  filterButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: colors.white, // Optional: if you want a background
    borderRadius: 10,
  },
  filterIcon: {
    width: 24, // Reduced for better proportion
    height: 24,
  },
});

export default SearchBar;