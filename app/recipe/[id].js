import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Colors from '../../constants/Colors';

export default function RecipeDetail() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('ingredients');
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/recipes/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    Animated.spring(slideAnim, {
      toValue: tab === 'ingredients' ? 0 : 1,
      useNativeDriver: true,
    }).start();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.center}>
        <Text>Recipe not found</Text>
      </View>
    );
  }


  const indicatorPosition = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 180],
  });

  return (
    <ScrollView style={styles.container}>
      <Pressable 
        style={styles.backButton}
        onPress={() => router.back()}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </Pressable>
      
      <Image source={{ uri: recipe.image }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.name}</Text>
        
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Prep Time</Text>
            <Text style={styles.metaValue}>{recipe.prepTimeMinutes} min</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Cook Time</Text>
            <Text style={styles.metaValue}>{recipe.cookTimeMinutes} min</Text>
          </View>
        </View>
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Servings</Text>
            <Text style={styles.metaValue}>{recipe.servings}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Rating</Text>
            <Text style={styles.metaValue}>{recipe.rating.toFixed(1)} ({recipe.reviewCount})</Text>
          </View>
        </View>

        {/* Tab Buttons */}
        <View style={styles.tabContainer}>
          <Pressable 
            style={[styles.tabButton, activeTab === 'ingredients' && styles.activeTab]}
            onPress={() => handleTabChange('ingredients')}
          >
            <Text style={[styles.tabText, activeTab === 'ingredients' && styles.activeTabText]}>
              Ingredients
            </Text>
          </Pressable>
          
          <Pressable 
            style={[styles.tabButton, activeTab === 'instructions' && styles.activeTab]}
            onPress={() => handleTabChange('instructions')}
          >
            <Text style={[styles.tabText, activeTab === 'instructions' && styles.activeTabText]}>
              Instructions
            </Text>
          </Pressable>
          
          <Animated.View 
            style={[
              styles.tabIndicator,
              { 
                transform: [{ translateX: indicatorPosition }],
                width: '50%' // Half the container width
              }
            ]} 
          />
        </View>

        {/* Content Area */}
        <Animated.View style={styles.contentArea}>
          {activeTab === 'ingredients' ? (
            <>
              <Text style={styles.sectionTitle}>Ingredients</Text>
              {recipe.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <Text style={styles.stepNumber}>{index + 1}.</Text>
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </>
          ) : (
            <>
              <Text style={styles.sectionTitle}>Instructions</Text>
              {recipe.instructions.map((step, index) => (
                <View key={index} style={styles.instructionItem}>
                  <Text style={styles.stepNumber}>{index + 1}.</Text>
                  <Text style={styles.instructionText}>{step}</Text>
                </View>
              ))}
            </>
          )}
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 5,
  },
  metaItem: {
    flex: 1,
    alignItems: 'left',
    padding: 5,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    width: 'auto',
    height: 'auto',
    gap: 8
  },
  metaLabel: {
    fontSize: 16,
    color: '#666',
  },
  metaValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    height: 50,
    position: 'relative',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    zIndex: 2,
  },
  activeTab: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontSize: 16,
    color: Colors.primary100,
    fontWeight: '600',
  },
  activeTabText: {
    color: Colors.white,
  },
  tabIndicator: {
    position: 'absolute',
    height: '90%',
    backgroundColor: Colors.primary100,
    opacity: 1,
    borderRadius: 10,
    top: 2,
    left: 0,
    zIndex: 1,
  },
  contentArea: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    width: '100%',
    height: 60,
    backgroundColor: Colors.primary40,
    borderRadius: 10,
    padding: 10
  },
  bullet: {
    fontSize: 18,
    color: '#888',
    marginRight: 5,
  },
  ingredientText: {
    fontSize: 16,
    color: Colors.grey,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    height: 76,
    backgroundColor: Colors.primary40,
    borderRadius: 10,
    padding: 10
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  instructionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  content: {
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 16,
    zIndex: 10,
    backgroundColor: Colors.primary60,
    borderRadius: 20,
    padding: 8,
  },
});