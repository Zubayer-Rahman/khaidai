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
          
          const response = await fetch('https://dummyjson.com/recipes');
          
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          
          const data = await response.json();
          
          const recommendedRecipes = data.recipes.slice(5, 10);
          setRandomRecipes(recommendedRecipes);
          
        } catch (err) {
          console.error('Error fetching recipes:', err);
          setError('Failed to load recommendations. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

      fetchRandomRecipes();
    }, []); 

    useEffect(() => {
    const searchRecipes = async () => {
      if (searchQuery.trim().length === 0) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`https://dummyjson.com/recipes/search?q=${searchQuery}`);
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        setResults(data.recipes || []);
        
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to search recipes. Please try again.');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      searchRecipes();
    }, 500);

    return () => clearTimeout(timer);
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
          autoFocus={false}
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
          
          {randomRecipes && randomRecipes.length > 0 && (
            <View style={styles.suggestionsContainer}>
              <Text style={styles.sectionTitle}>Recommended Recipes</Text>
              <FlatList
                data={randomRecipes}
                keyExtractor={(item) => item.id.toString()}
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
                    <Text style={styles.recipeTitle} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.recipeRating} numberOfLines={2}>Review: {item.rating} ({item.reviewCount})</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </>
      ) : (
        <>
          {results.length > 0 ? (
            <FlatList
              data={results}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.resultItem}
                  onPress={() => router.push(`/recipe/${item.id}`)}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{ width:'100%', height: '150', borderRadius: 8, marginRight: 10, marginBottom: 10, flex: 1 }}
                    resizeMode="cover"
                  />
                  <View>
                    <Text style={styles.resultTitle}>{item.name}</Text>
                    <Text style={styles.resultDetails}>
                      {item.rating} ★ | {item.prepTimeMinutes + item.cookTimeMinutes} mins
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              ListHeaderComponent={<Text style={styles.sectionTitle}>Search Results</Text>}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No recipes found for {searchQuery}</Text>
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
    color: Colors.white,
    fontSize: 16,
    backgroundColor: Colors.primary10,
    padding: 10,
    borderRadius: 8
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionsContainer: {
    marginBottom: 20,
    height: 'auto'
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
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 5,
  },
  resultDetails: {
    fontSize: 16,
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
    height: '100',
    borderRadius: 8,
    marginBottom: 8,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  recipeRating: {
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