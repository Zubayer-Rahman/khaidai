import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
// import NavBar from '../../components/NavBar';
import { Link } from 'expo-router';
import RecipeCard from '../../components/RecipeCard';
import SearchBar from '../../components/SearchBar';
import colors from '../../constants/Colors';
import useRecipes from '../../hooks/useRecipe';

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen() {
const cuisines = ['All', 'Indian', 'Bangla', 'Chinese', 'Japanese', 'Thai', 'Korean', 'Italian', '+'];
const { recipes } = useRecipes();

    return (
        <View style={styles.container}>
            <GestureHandlerRootView>
                <View style={{ flex: 1 }}>
                    <ScrollView
                        contentContainerStyle={{paddingBottom: 80}}
                        showsVerticalScrollIndicator={false}
                        >
                        {/* Header */}
                        <View style={styles.header}>  
                            <View style={styles.details}>
                                <Text style={styles.name}>Hello Zubayer</Text>
                                <Text style={styles.description}>What are you cooking today?</Text>
                            </View>
                            <Link href="/Profile" asChild>
                                <Pressable style={styles.profileImageContainer}>
                                    <Image source={require('../../assets/images/person-icon.svg')} style={styles.profileImage}/>
                                </Pressable>
                            </Link>
                        </View>

                        <SearchBar/> {/* Search Bar Component*/}

                        {/* Cuisine Options Slider */}
                        <View style={styles.section}>
                            <ScrollView 
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.cuisineScrollContainer}
                            >
                                {cuisines.map((cuisine, index) => (
                                    <Pressable 
                                        key={index} 
                                        style={[
                                            styles.cuisineItem,
                                            index === 0 && styles.activeCuisineItem
                                        ]}
                                    >
                                        <Text style={[
                                            styles.cuisineText,
                                            index === 0 && styles.activeCuisineText
                                        ]}>
                                            {cuisine}
                                        </Text>
                                    </Pressable>
                                ))}
                            </ScrollView>
                        </View>

                
                        {/* Featured Recipes Slider */}
                        <View >
                            <Text style={styles.sectionTitle}>Featured Recipes</Text>
                            <FlatList
                                data={recipes}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => <RecipeCard recipe={item} />}
                                contentContainerStyle={styles.list}
                                horizontal = {true}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>

                        {/* New Recipes Slider */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>New Recipe</Text>
                            <FlatList
                                data={recipes}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => <RecipeCard recipe={item} />}
                                contentContainerStyle={styles.list}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </ScrollView>
                </View>

            </GestureHandlerRootView>
            {/* <NavBar/> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 30,
        backgroundColor: colors.white,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    details: {
        flex: 1,
    },
    name: {
        fontSize: 22,
        fontWeight: '600',
        color: colors.black,
    },
    description: {
        fontSize: 14,
        color: colors.grey3,
        marginTop: 5,
    },
    profileImageContainer: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: colors.lightGold,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 60,
        height: 60,
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: colors.grey3,
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: colors.black,
    },
    filterButton: {
        marginLeft: 10,
        padding: 10,
    },
    filterIcon: {
        width: 40,
        height: 40,
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.black,
        marginBottom: 15,
    },
    cuisineScrollContainer: {
        paddingRight: 20,
    },
    cuisineItem: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.primary100,
        marginRight: 10,
    },
    activeCuisineItem: {
        backgroundColor: colors.primary100,
    },
    cuisineText: {
        fontSize: 14,
        color: colors.primary100,
    },
    activeCuisineText: {
        color: colors.white,
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
    bookmarkIcon: {
        width: 20,
        height: 20,
    },
    newRecipeScrollContainer: {
        paddingRight: 20,
    },
    newRecipeCard: {
        width: screenWidth * 0.8,
        backgroundColor: colors.primary20,
        borderRadius: 15,
        padding: 15,
        marginRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    newRecipeDetails: {
        flex: 1,
        marginRight: 15,
    },
    newRecipeTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.black,
        marginBottom: 10,
    },
    newRecipeInfo: {
        fontSize: 14,
        color: colors.grey3,
        marginBottom: 5,
    },
    newRecipeImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    list:{
        gap: 10,
    }
});