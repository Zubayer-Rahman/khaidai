import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import Colors from "../../constants/Colors";

const notifications = [
  {
    id: "1",
    type: "like",
    user: "ChefMaster22",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    recipe: "Spicy Thai Basil Chicken",
    time: "2 mins ago",
    read: false,
  },
  {
    id: "2",
    type: "comment",
    user: "FoodExplorer",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    recipe: "Creamy Mushroom Pasta",
    text: "This looks amazing! Can I substitute...",
    time: "1 hour ago",
    read: true,
  },
  {
    id: "3",
    type: "follow",
    user: "CulinaryArtist",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    time: "3 hours ago",
    read: false,
  },
  {
    id: "4",
    type: "recipe",
    user: "GlobalTastes",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    recipe: "Authentic Tacos al Pastor",
    time: "1 day ago",
    read: true,
  },
];

export default function NotificationScreen() {
  // const [refreshing, ] = useState(false);
  const router = useRouter();

  // const onRefresh = () => {
  //   setRefreshing(true);
  //   setTimeout(() => setRefreshing(false), 1000);
  // };

  const renderNotificationIcon = (type) => {
    switch (type) {
      case "like":
        return <Ionicons name="heart" size={24} color={Colors.error} />;
      case "comment":
        return (
          <Ionicons name="chatbubble" size={24} color={Colors.primary100} />
        );
      case "follow":
        return <Ionicons name="person-add" size={24} color={Colors.success} />;
      default:
        return (
          <MaterialCommunityIcons
            name="chef-hat"
            size={24}
            color={Colors.warning}
          />
        );
    }
  };

  const handleNotificationPress = (notification) => {
    if (notification.type === "recipe") {
      router.push(`/recipe/${notification.id}`);
    } else if (notification.type === "follow") {
      router.push(`/profile/${notification.user}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <Pressable>
          <Ionicons name="settings-outline" size={24} color={Colors.black} />
        </Pressable>
      </View>

      {/* Notification Tabs */}
      <View style={styles.tabContainer}>
        <Pressable style={[styles.tabButton, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>All</Text>
        </Pressable>
        <Pressable style={styles.tabButton}>
          <Text style={styles.tabText}>Unread</Text>
        </Pressable>
      </View>

      {/* Notification List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.notificationCard, !item.read && styles.unreadCard]}
            onPress={() => handleNotificationPress(item)}
          >
            <View style={styles.notificationHeader}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              {renderNotificationIcon(item.type)}
              <Text style={styles.userName}>{item.user}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>

            {item.type === "like" && (
              <Text style={styles.notificationText}>
                liked your recipe{" "}
                <Text style={styles.recipeName}>{item.recipe}</Text>
              </Text>
            )}

            {item.type === "comment" && (
              <>
                <Text style={styles.notificationText}>
                  commented on{" "}
                  <Text style={styles.recipeName}>{item.recipe}</Text>
                </Text>
                <Text style={styles.commentText}>&quot;{item.text}&quot;</Text>
              </>
            )}

            {item.type === "follow" && (
              <Text style={styles.notificationText}>started following you</Text>
            )}

            {item.type === "recipe" && (
              <Text style={styles.notificationText}>
                posted a new recipe{" "}
                <Text style={styles.recipeName}>{item.recipe}</Text>
              </Text>
            )}
          </Pressable>
        )}
        // 
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.black,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: Colors.grey4,
    borderRadius: 10,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.grey2,
  },
  activeTabText: {
    color: Colors.primary100,
  },
  listContainer: {
    paddingBottom: 20,
  },
  notificationCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.white,
  },
  unreadCard: {
    borderLeftColor: Colors.primary100,
    backgroundColor: Colors.primary10,
  },
  notificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  userName: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.black,
    marginLeft: 8,
    flex: 1,
  },
  time: {
    fontSize: 12,
    color: Colors.grey2,
  },
  notificationText: {
    fontSize: 14,
    color: Colors.grey2,
    marginLeft: 48, // Avatar width + margin
  },
  recipeName: {
    color: Colors.primary100,
    fontWeight: "600",
  },
  commentText: {
    fontSize: 14,
    color: Colors.black,
    marginLeft: 48,
    marginTop: 8,
    fontStyle: "italic",
    backgroundColor: Colors.grey5,
    padding: 10,
    borderRadius: 8,
  },
});
