// components/RecipeCard.js
import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const RecipeCard = ({ recipe }) => {
  return (
    <Link href={`/recipe/${recipe.id}`} asChild>
      <Pressable style={styles.card}>
        <Image 
          source={{ uri: recipe.image }} 
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>{recipe.name}</Text>
          <View style={styles.metaContainer}>
            <Text style={styles.metaText}>⏱️ {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</Text>
            <Text style={styles.metaText}>⭐ {recipe.rating.toFixed(1)}</Text>
            <Text style={styles.metaText}>👨‍👩‍👧‍👦 {recipe.servings}</Text>
          </View>
          <Text style={styles.cuisine}>{recipe.cuisine}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 150,
  },
  details: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
  },
  cuisine: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
});

export default RecipeCard;