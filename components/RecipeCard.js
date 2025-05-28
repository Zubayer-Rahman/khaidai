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
        {/* <Pressable>
          <Ionicons name='bookmark-outline' style={styles.bookmarkIcon}/> 
        </Pressable> */}
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
    height: "200",
  },
  bookmarkIcon:{
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    borderRadius: 20, 
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, 
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
  },
  details: {
    padding: 12,
    width: 250
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    gap: 25,
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
    marginTop: 10
  },
});

export default RecipeCard;