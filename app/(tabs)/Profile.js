import { useAuth, useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';

const Profile = () => {
  const { signOut, isLoaded } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (!isLoaded) return;
    
    setLoading(true);
    try {
      Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', onPress: async () => {
          try {
            await signOut();
            router.replace('/LogIn');
          } catch (_) {
            Alert.alert('Error', 'Failed to log out');
          }
        }}
      ]
    );
    } catch (err) {
      Alert.alert('Error', err.message || 'Failed to log out');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary100} />
      </View>
    );
  }

  return (
    <View style={styles.profileContainer}>
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={{flex: 1, marginBottom: 100}}>
          {/* Header with user email and logout button */}
          <View style={styles.userNameContainer}>
            <Text style={styles.userName}>
              {user.firstName || user.username || 'User'}
            </Text>
            <Pressable onPress={handleLogout} style={styles.logoutButton}>
              {loading ? (
                <ActivityIndicator color={Colors.white} />
              ) : (
                <Image
                  source={require('../../assets/images/more.png')}
                  style={styles.moreIcon}
                />
              )}
            </Pressable>
          </View>
          
          {/* Profile picture and stats */}
          <View style={styles.mainProfileContainer}>
            <View>
              <Image
                source={
                  user.imageUrl 
                    ? { uri: user.imageUrl } 
                    : require('../../assets/images/profile-picture.png')
                }
                style={styles.profileImage}
              />
            </View>

            <View style={styles.followFollowingContainer}>
              <View style={styles.rfContainer}>
                <Text style={styles.recipeNumText}>Recipes</Text>
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

          {/* User profile info */}
          <View style={styles.userProfileNameContainer}>
            <Text style={styles.userProfileName}>
              {user.fullName || user.username || 'No Name'}
            </Text>
            <Text style={styles.userProfileProfession}>
              {user.publicMetadata?.profession || 'No Profession'}
            </Text>
          </View>
        </View>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600', 
    color: Colors.black, 
  },
  moreIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.black,
  },
  logoutButton: {
    padding: 8,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  mainProfileContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  followFollowingContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  rfContainer: {
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
  },
  recipeNumText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
  },
  recipeNum: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
  },
  followerText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
  },
  followerNum: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
  },
  followingText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
  },
  followingNum: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
  },
  userProfileNameContainer: {
    marginTop: 10,
  },
  userProfileName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  userProfileProfession: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.grey2,
  },
});

export default Profile;