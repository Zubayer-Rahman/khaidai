import { useAuth, useUser } from '@clerk/clerk-expo';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');

const Profile = () => {
  const { signOut, isLoaded } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('myRecipes');
  
  // Separate animations for menu and tabs
  const menuAnim = useRef(new Animated.Value(-width)).current;
  const tabAnim = useRef(new Animated.Value(0)).current;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const position = ['myRecipes', 'videos', 'saved'].indexOf(tab) * (width / 3);
    Animated.spring(tabAnim, {
      toValue: position,
      useNativeDriver: true,
    }).start();
  };
  
  const tabIndicatorPosition = tabAnim.interpolate({
    inputRange: [0, 140, 290],
    outputRange: [0, 125, 260],
  });

  console.log(tabIndicatorPosition); //to calculate the integer value of the input and output ranges

  const toggleMenu = () => {
    Animated.timing(menuAnim, {
      toValue: menuVisible ? -width : 0,
      duration: 300,
      useNativeDriver: true
    }).start();
    setMenuVisible(!menuVisible);
  };

  const handleLogout = async () => {
    if (!isLoaded) return;
    
    try {
      await signOut();
      router.replace('/LogIn');
    } catch (err) {
      Alert.alert('Error', err.message || 'Failed to log out');
    } finally {
      toggleMenu();
    }
  };

  const menuOptions = [
    { icon: 'settings', name: 'Settings', action: () => router.push('/Settings') },
    { icon: 'bookmark', name: 'Saved Recipes', action: () => router.push('/Saved') },
    { icon: 'credit-card', name: 'Payment Methods', action: () => router.push('/Payment') },
    { icon: 'help-circle', name: 'Help Center', action: () => router.push('/Help') },
    { icon: 'log-out', name: 'Log Out', action: handleLogout },
  ];

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary100} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.profileContainer}>
        {/* Overlay when menu is open */}
        {menuVisible && (
          <TouchableOpacity 
            style={styles.overlay}
            activeOpacity={1}
            onPress={toggleMenu}
          />
        )}

        {/* Side Menu */}
        <Animated.View style={[
          styles.menuContainer,
          { transform: [{ translateX: menuAnim }] }
        ]}>
          <View style={styles.menuHeader}>
            <Image
              source={
                user.imageUrl 
                  ? { uri: user.imageUrl } 
                  : require('../../assets/images/profile-picture.png')
              }
              style={styles.menuProfileImage}
            />
            <Text style={styles.menuUserName}>
              {user.firstName || user.username || 'User'}
            </Text>
            <Text style={styles.menuUserEmail}>
              {user.primaryEmailAddress?.emailAddress}
            </Text>
          </View>

          <View style={styles.menuOptions}>
            {menuOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuOption}
                onPress={option.action}
              >
                <Feather 
                  name={option.icon} 
                  size={24} 
                  color={Colors.grey2} 
                  style={styles.menuIcon}
                />
                <Text style={styles.menuOptionText}>{option.name}</Text>
                <MaterialIcons 
                  name="keyboard-arrow-right" 
                  size={24} 
                  color={Colors.grey3} 
                />
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Main Profile Content */}
        <View style={styles.mainContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity 
              onPress={toggleMenu}
              hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
            >
              <Ionicons name="menu" size={28} color={Colors.primary100} />
            </TouchableOpacity>
          </View>

          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileTop}>
              <Image
                source={
                  user.imageUrl 
                    ? { uri: user.imageUrl } 
                    : require('../../assets/images/profile-picture.png')
                }
                style={styles.profileImage}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.userName}>
                  {user.fullName || user.username || 'No Name'}
                </Text>
                <Text style={styles.userProfession}>
                  {user.publicMetadata?.profession || 'Food Enthusiast'}
                </Text>
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={() => router.push('/EditProfile')}
                >
                  <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>34</Text>
                <Text style={styles.statLabel}>Recipes</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>546</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>334</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
          </View>

          {/* Tabs Section */}
          <View style={styles.tabContainer}>
            <Pressable 
              style={({ pressed }) => [
                styles.tabButton, 
                activeTab === 'myRecipes' && styles.activeTab,
                pressed && styles.pressedTab
              ]}
              onPress={() => handleTabChange('myRecipes')}
            >
              <Text style={[
                styles.tabText, 
                activeTab === 'myRecipes' ? styles.activeTabText : styles.inactiveTabText
              ]}>
                My Recipes
              </Text>
            </Pressable>
            
            <Pressable 
              style={({ pressed }) => [
                styles.tabButton, 
                activeTab === 'videos' && styles.activeTab,
                pressed && styles.pressedTab
              ]}
              onPress={() => handleTabChange('videos')}
            >
              <Text style={[
                styles.tabText, 
                activeTab === 'videos' ? styles.activeTabText : styles.inactiveTabText
              ]}>
                Videos
              </Text>
            </Pressable>

            <Pressable 
              style={({ pressed }) => [
                styles.tabButton, 
                activeTab === 'saved' && styles.activeTab,
                pressed && styles.pressedTab
              ]}
              onPress={() => handleTabChange('saved')}
            >
              <Text style={[
                styles.tabText, 
                activeTab === 'saved' ? styles.activeTabText : styles.inactiveTabText
              ]}>
                Saved
              </Text>
            </Pressable>
            
            <Animated.View 
              style={[
                styles.tabIndicator,
                { 
                  transform: [{ translateX: tabIndicatorPosition }],
                  width: `${100/3}%`
                }
              ]} 
            />
          </View>

          {/* Tab Content */}
          <View style={styles.tabContent}>
            {activeTab === 'myRecipes' && (
              <Text>My Recipes Content</Text>
            )}
            {activeTab === 'videos' && (
              <Text>Videos Content</Text>
            )}
            {activeTab === 'saved' && (
              <Text>Saved Content</Text>
            )}
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 5,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: width * 0.85,
    backgroundColor: Colors.white,
    zIndex: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  menuHeader: {
    padding: 30,
    paddingTop: 50,
    backgroundColor: Colors.primary20,
    borderBottomRightRadius: 20,
    alignItems: 'center'
  },
  menuProfileImage: {
    width: 125,
    height: 125,
    borderRadius: '50%',
    borderWidth: 3,
    borderColor: Colors.white,
    marginBottom: 15,
  },
  menuUserName: {
    fontSize: 20,
    fontWeight: 600,
    color: Colors.black,
  },
  menuUserEmail: {
    fontSize: 11,
    color: Colors.grey3,
  },
  menuOptions: {
    padding: 20,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey4,
  },
  menuIcon: {
    marginRight: 15,
    width: 24,
  },
  menuOptionText: {
    flex: 1,
    fontSize: 16,
    color: Colors.black,
  },
  mainContent: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
  },
  profileCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  profileTop: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.primary100,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 5,
  },
  userProfession: {
    fontSize: 14,
    color: Colors.grey2,
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: Colors.primary100,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.grey4,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 600,
    color: Colors.black,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.grey2,
  },
  tabContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    backgroundColor: Colors.white,
    borderRadius: 10,
    height: 35,
    position: 'relative',
    overflow: 'hidden',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    zIndex: 2,
  },
  activeTab: {
    backgroundColor: 'transparent',
  },
  pressedTab: {
    opacity: 0.7,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: Colors.white,
  },
  inactiveTabText: {
    color: Colors.primary100,
  },
  tabIndicator: {
    position: 'absolute',
    height: '100%',
    backgroundColor: Colors.primary100,
    borderRadius: 10,
    top: 0,
    left: 0,
    zIndex: 1,
  },
  tabContent: {
    flex: 1,
    paddingTop: 20,
  },
});

export default Profile;