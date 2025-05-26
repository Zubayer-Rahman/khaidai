import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';

const Profile = () => {
  return (
    <SafeAreaView style={styles.profileContainer}>
        <GestureHandlerRootView style={{flex: 1}}>
            <View style={{flex: 1, marginBottom: 100}}>
                <View style={styles.userNameContainer}>
                    <Text style={styles.userName}>Hello user</Text>
                    <TouchableOpacity>
                        <Image
                        source={require('../../assets/images/more.png')}
                        />
                    </TouchableOpacity>
                </View>
                

                <View style={styles.mainProfileContainer}>
                    <View>
                        <Image
                            source={require('../../assets/images/profile-picture.png')}
                        />
                    </View>

                    <View style={styles.followFollowingContainer}>
                        <View style={styles.rfContainer}>
                            <Text style={styles.recipeNumText}>Recipe</Text>
                            <Text style={styles.recipeNum}>34</Text>
                        </View>

                        <View style={styles.rfContainer}>
                            <Text style={styles.followerText}>Followers</Text>
                            <Text style={styles.followerNum}>546</Text>
                        </View>

                        <View style={styles.rfContainer}>
                            <Text style={styles.followingText}>Following</Text>
                            <Text style={styles.followingNum}>334</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.userProfileNameContainer}>
                    <Text style={styles.userProfileName}>Afuwape Abiodun</Text>
                    <Text style={styles.userProfileProfession}>Chef</Text>

                </View>
            </View>
        </GestureHandlerRootView>
        {/* <NavBar/> */}
    </SafeAreaView>

  )
}

export default Profile

const styles = StyleSheet.create({
    profileContainer:{
        paddingTop: 40,
        paddingHorizontal:20,
    },
    userNameContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    userName:{
        fontSize: 18,
        fontWeight: 600
    },
    mainProfileContainer:{
        paddingVertical: 20,
        paddingBottom: 10,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    followFollowingContainer:{
        flexDirection: 'row',
        gap: 25
    },
    rfContainer:{
        gap: 10,
        alignItems: 'center'
    },
    recipeNumText:{
        fontSize: 16,
        fontWeight: 500
    },
    recipeNum:{
        fontSize: 14,
        fontWeight: 500
    },
    followerText:{
        fontSize: 16,
        fontWeight: 500
    },
    followerNum:{
        fontSize: 14,
        fontWeight: 500
    },
    followingText:{
        fontSize: 16,
        fontWeight: 500
    },
    followingNum:{
        fontSize: 14,
        fontWeight: 500
    },
    userProfileName:{
        fontSize: 16,
        fontWeight: 600
    },
    userProfileProfession:{
        fontSize: 14,
        fontWeight: 500,
        color: Colors.grey2,
    }
})