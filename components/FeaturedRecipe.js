import { Dimensions, Image, Link, Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../constants/Colors';
const { width: screenWidth } = Dimensions.get('window');



const recipe = (Recipes) => {
  return (
    <Link href="/recipeDetails" asChild>
        <Pressable style={styles.section}>
            <Image style={styles.recipeImage} source={{ uri: recipe.image }}/>
            <View style={styles.recipeFooter}>
                <Text style={styles.recipeTitle}>{recipe.name}</Text>
                <Text style={styles.recipeTime}>⏱️ {recipe.prepTimeMinutes} min</Text>
                <Text style={styles.recipeRating}>⭐ {recipe.rating}</Text>
                <Pressable>
                    <Image style={styles.bookmarkIcon} source={require('../assets/images/bookmark.png')}/>
                </Pressable>
            </View>       
        </Pressable>
    </Link>

  )
}

export default recipe

const styles = StyleSheet.create({
    section: {
        marginBottom: 25,
        gap: 10,
        
    },
    sectionTitle: {
        fontSize: 30,
        fontWeight: '700',
        color: colors.black,
        marginBottom: 15,
    },
    recipeScrollContainer: {
        paddingRight: 20,
    },
    recipeCard: {
        width: screenWidth * 0.6,
        backgroundColor: colors.primary20,
        borderRadius: 15,
        padding: 15,
        marginRight: 15,
    },
    recipeImage: {
        width: '100%',
        height: 150,
        borderRadius: '50%',
        marginBottom: 10,
    },
    recipeTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.black,
        marginBottom: 5,
    },
    recipeFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 400,
        height: 400
    },
    recipeTime: {
        fontSize: 14,
        color: colors.grey3,
    },
    recipeRating: {
        fontSize: 14,
        color: '#666',
    },
    bookmarkIcon: {
        width: 20,
        height: 20,
    },
})