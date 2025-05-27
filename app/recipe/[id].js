import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';


export default function RecipeDetail() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <ScrollView style={styles.container}>
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
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Servings</Text>
            <Text style={styles.metaValue}>{recipe.servings}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Rating</Text>
            <Text style={styles.metaValue}>{recipe.rating.toFixed(1)} ({recipe.reviewCount})</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Ingredients</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.ingredientText}>{ingredient}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Instructions</Text>
        {recipe.instructions.map((step, index) => (
          <View key={index} style={styles.instructionItem}>
            <Text style={styles.stepNumber}>{index + 1}.</Text>
            <Text style={styles.instructionText}>{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
container:{
    flex: 1,
    backgroundColor: '#fff',
    padding: 2,
},
image:{
    width: '100%',
    height: 250,
    borderRadius: 10,
},
title:{
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
},
metaContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 5,
},
metaItem:{
    flex: 1,
    alignItems: 'left',
    padding: 5,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
},
metaLabel:{
    fontSize: 14,
    color: '#666',
},
metaValue:{
    fontSize: 12,
    fontWeight: 'bold',
},
sectionTitle:{
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
},
ingredientItem:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
},
bullet:{
    fontSize: 18,
    color: '#888',
    marginRight: 5,
},
ingredientText:{
    fontSize: 16,
    color: '#333',
},
instructionItem:{
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
},
stepNumber:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
},
instructionText:{
    fontSize: 16,
    color: '#333',
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

});
