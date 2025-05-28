import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';

export default function SearchScreen() {
  const router = useRouter();
  const { initialSearch = '' } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      // Replace with your actual search logic
      const mockSuggestions = [
        `${searchQuery} recipe`,
        `Healthy ${searchQuery}`,
        `Easy ${searchQuery} dinner`
      ];
      setSuggestions(mockSuggestions);

      const mockResults = Array(5).fill(0).map((_, i) => ({
        id: i.toString(),
        title: `${searchQuery} Recipe ${i + 1}`,
        rating: (5 - i * 0.5).toFixed(1),
        cookTime: `${20 + i * 5} mins`,
      }));
      setResults(mockResults);
    } else {
      setSuggestions(['Pasta', 'Chicken', 'Vegetarian', 'Desserts']);
      setResults([]);
    }
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image 
          source={require('../../assets/images/search-icon.png')} 
          style={styles.searchIcon}
          resizeMode="contain"
        />
        <TextInput
          style={styles.input}
          placeholder="Search recipes..."
          placeholderTextColor={Colors.grey3}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus={true}
          returnKeyType="search"
        />
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {searchQuery.length === 0 ? (
        <View style={styles.suggestionsContainer}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          {suggestions.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.suggestionItem}
              onPress={() => setSearchQuery(item)}
            >
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <>
          <View style={styles.suggestionsContainer}>
            <Text style={styles.sectionTitle}>Suggestions</Text>
            {suggestions.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.suggestionItem}
                onPress={() => setSearchQuery(item)}
              >
                <Text style={styles.suggestionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.resultItem}
                onPress={() => router.push(`/recipe/${item.id}`)}
              >
                <Text style={styles.resultTitle}>{item.title}</Text>
                <Text style={styles.resultDetails}>
                  {item.rating} ★ | {item.cookTime}
                </Text>
              </TouchableOpacity>
            )}
            ListHeaderComponent={
              results.length > 0 && <Text style={styles.sectionTitle}>Results</Text>
            }
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 15,
    paddingTop: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.grey2,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.black,
    paddingVertical: 8,
  },
  cancelButton: {
    marginLeft: 10,
    color: Colors.primary,
    fontSize: 16,
  },
  suggestionsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.black,
  },
  suggestionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey1,
  },
  suggestionText: {
    fontSize: 16,
    color: Colors.grey3,
  },
  resultItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
    marginBottom: 5,
  },
  resultDetails: {
    fontSize: 14,
    color: Colors.grey3,
  },
});