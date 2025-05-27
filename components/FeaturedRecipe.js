import { Dimensions, Image, Link, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../constants/Colors';
const { width: screenWidth } = Dimensions.get('window');



const recipe = (recipe) => {
  return (
    <Link href="/recipeDetails" asChild>
        <Pressable style={styles.section}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.recipeScrollContainer}
            >
             <Image style={styles.recipeImage} source={{ uri: recipe.image }}/>
            <Text style={styles.recipeTitle}>{recipe.name}</Text>
            <View style={styles.recipeFooter}>
                <Text style={styles.recipeTime}>⏱️ {recipe.prepTimeMinutes} min</Text>
                <Text style={styles.recipeRating}>⭐ {recipe.rating}</Text>
                <Pressable>
                    <Image style={styles.bookmarkIcon} source={require('../assets/images/bookmark.png')}/>
                </Pressable>
            </View>       
            </ScrollView>
        </Pressable>
    </Link>

  )
}

export default recipe

const styles = StyleSheet.create({
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 20,
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
        borderRadius: 10,
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