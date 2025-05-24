import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import NavBar from '../components/NavBar';
import colors from '../constants/Colors';

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen() {
    const cuisines = ['All', 'Indian', 'Bangla', 'Chinese', 'Japanese', 'Thai', 'Korean', 'Italian', '+'];
    
    const featuredItems = [
        { id: 1, title: 'Classic Greek Salad', image: require('../assets/images/product.png'), time: '15 mins', icon: require('../assets/images/bookmark.png')},
        { id: 2, title: 'Italian Pasta', image: require('../assets/images/product.png'), time: '20 mins', icon: require('../assets/images/bookmark.png')},
        { id: 3, title: 'Chicken Curry', image: require('../assets/images/product.png'), time: '30 mins', icon: require('../assets/images/bookmark.png')},
        { id: 4, title: 'Beef Steak', image: require('../assets/images/product.png'), time: '25 mins', icon: require('../assets/images/bookmark.png')},
    ];

    const newRecipes = [
        { id: 1, title: 'Vegetable Stir Fry', image: require('../assets/images/product.png'), time: '15 mins', rating: '4.5'},
        { id: 2, title: 'Chocolate Cake', image: require('../assets/images/product.png'), time: '45 mins', rating: '4.8'},
        { id: 3, title: 'Mushroom Soup', image: require('../assets/images/product.png'), time: '20 mins', rating: '4.2'},
        { id: 4, title: 'Grilled Salmon', image: require('../assets/images/product.png'), time: '25 mins', rating: '4.7'},
    ];

    return (
        <View style={styles.container}>
            <GestureHandlerRootView>
                {/* Header */}
                <View style={styles.header}>  
                    <View style={styles.details}>
                        <Text style={styles.name}>Hello Zubayer</Text>
                        <Text style={styles.description}>What are you cooking today?</Text>
                    </View>
                    <TouchableOpacity style={styles.profileImageContainer}>
                        <Image source={require('../assets/images/person-icon.svg')} style={styles.profileImage}/>
                    </TouchableOpacity>
                </View>

                {/* <SearchBar/> */}
                {/* Search Bar */}
                <View style={styles.searchBarContainer}>
                    <View style={styles.searchBar}>
                        <Image source={require('../assets/images/search-icon.png')} style={styles.searchIcon}/>
                        <TextInput
                            style={styles.input}
                            placeholder="Search..."
                            placeholderTextColor={colors.grey3}
                        />
                    </View>
                    <TouchableOpacity style={styles.filterButton}>
                        <Image source={require('../assets/images/Filter.png')} style={styles.filterIcon}/>
                    </TouchableOpacity>
                </View>

                {/* Cuisine Options Slider */}
                <View style={styles.section}>
                    <ScrollView 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.cuisineScrollContainer}
                    >
                        {cuisines.map((cuisine, index) => (
                            <TouchableOpacity 
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
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Featured Recipes Slider */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Featured Recipes</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.recipeScrollContainer}
                    >
                        {featuredItems.map((item) => (
                            <View key={item.id} style={styles.recipeCard}>
                                <Image source={item.image} style={styles.recipeImage}/>
                                <Text style={styles.recipeTitle}>{item.title}</Text>
                                <View style={styles.recipeFooter}>
                                    <Text style={styles.recipeTime}>{item.time}</Text>
                                    <TouchableOpacity>
                                        <Image source={item.icon} style={styles.bookmarkIcon}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* New Recipes Slider */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>New Recipe</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.newRecipeScrollContainer}
                    >
                        {newRecipes.map((item) => (
                            <View key={item.id} style={styles.newRecipeCard}>
                                <View style={styles.newRecipeDetails}>
                                    <Text style={styles.newRecipeTitle}>{item.title}</Text>
                                    <Text style={styles.newRecipeInfo}>Time: {item.time}</Text>
                                    <Text style={styles.newRecipeInfo}>Rating: {item.rating}</Text>
                                </View>
                                <Image source={item.image} style={styles.newRecipeImage}/>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                <NavBar/>
            </GestureHandlerRootView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 50,
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
});