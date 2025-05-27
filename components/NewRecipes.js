import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'

const NewRecipes = (recipe) => {
  return (
    <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.newRecipeScrollContainer}
    >
        <View style={styles.newRecipeCard}>
            <View style={styles.newRecipeDetails}>
                <Text style={styles.newRecipeTitle}>{recipe.name}</Text>
                <Text style={styles.newRecipeInfo}>⏱️ {recipe.prepTimeMinutes} min</Text>
                <Text style={styles.newRecipeInfo}>⭐ {recipe.rating}</Text>
            </View>
            <Image ssource={{ uri: recipe.image }} style={styles.newRecipeImage}/>
        </View>
    </ScrollView>
  )
}

export default NewRecipes

const styles = StyleSheet.create({})