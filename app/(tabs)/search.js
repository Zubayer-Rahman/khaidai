import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';

export default function SearchScreen() {
  const router = useRouter();
  const { initialSearch = '' } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [randomRecipes, setRandomRecipes] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
  const fetchRandomRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const API_URL = 'https://dummyjson.com/recipes/random?number=5';
      const response = await fetch(API_URL);
      
      // First check if response is HTML
      const responseText = await response.text();
      if (responseText.startsWith("<")) {
        throw new Error("Server returned HTML (likely an error page)");
      }
      
      // Now safely parse as JSON
      const data = JSON.parse(responseText);
      
      if (!data.recipes) {
        throw new Error("Unexpected API response format");
      }
      
      setRandomRecipes(data.recipes);
      
    } catch (err) {
      console.error('API Error:', err.message);
      setError('Failed to load recipes. Please check your connection.');
      setRandomRecipes([]); // Fallback to empty array
      
      // For debugging - remove in production
      if (err.message.includes("HTML")) {
        console.warn("HTML Response:", err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  fetchRandomRecipes();
}, []);


  useEffect(() => {
  const fetchRandomRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      

      const response = await fetch('https://dummyjson.com/recipes/');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }

      const data = await response.json();
      setRandomRecipes(data.recipes || []);
      
    } catch (err) {
      console.error('Error fetching random recipes:', err);
      setError('Failed to load recommendations. Please try again later.');
      setRandomRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  fetchRandomRecipes();
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

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary100} />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : searchQuery.length === 0 ? (
        <>
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
          
          {/* Only show recommendations if we have data */}
          {randomRecipes && randomRecipes.length > 0 && (
            <View style={styles.suggestionsContainer}>
              <Text style={styles.sectionTitle}>Recommended Recipes</Text>
              <FlatList
                horizontal = {false}
                showsHorizontalScrollIndicator={false}
                data={randomRecipes}
                keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={styles.recipeCard}
                    onPress={() => router.push(`/recipe/${item.id}`)}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={styles.recipeImage}
                      resizeMode="cover"
                    />
                    <Text style={styles.recipeTitle} numberOfLines={1}>{item.title}</Text>
                  </TouchableOpacity>
                )}
                contentContainerStyle={styles.horizontalList}
              />
            </View>
          )}
        </>
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

          {/* Only show results if we have data */}
          {results && results.length > 0 ? (
            <FlatList
              data={results}
              keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
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
              ListHeaderComponent={<Text style={styles.sectionTitle}>Results</Text>}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No results found</Text>
            </View>
          )}
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
    color: Colors.primary100,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderBottomColor: Colors.grey2,
  },
  suggestionText: {
    fontSize: 16,
    color: Colors.grey3,
  },
  resultItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey2,
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
  horizontalList: {
    paddingBottom: 10,
  },
  recipeCard: {
    width: '100%',
    height: '160',
    marginRight: 15,
  },
  recipeImage: {
    width: '100%',
    height: '150',
    borderRadius: 8,
    marginBottom: 8,
  },
  recipeTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: Colors.primary100,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: Colors.grey3,
    fontSize: 16,
  },
});