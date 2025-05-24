import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import colors from '../constants/Colors';

const SearchBar = ({ searchText, onSearchChange, onFilterPress }) => {
  return (
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
    width: 40,
    height: 40,
  },
});

export default SearchBar;