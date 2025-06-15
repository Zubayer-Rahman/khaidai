import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const CreatePostScreen = () => {
  const [postText, setPostText] = useState('');
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useState('');
  const [taggedUsers, setTaggedUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map(asset => asset.uri);
      setImages([...images, ...selectedImages]);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async () => {
    if (!postText.trim() && images.length === 0) {
      Alert.alert('Error', 'Please add some text or an image to your post');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const postData = {
        text: postText,
        images: images, 
        location,
        taggedUsers,
        createdAt: new Date().toISOString(),
      };

      console.log('Creating post:', postData);
      await new Promise(resolve => setTimeout(resolve, 1500));

      setPostText('');
      setImages([]);
      setLocation('');
      setTaggedUsers([]);

      navigation.goBack();
      
      Alert.alert('Success', 'Your post has been created!');
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Error', 'Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>What is New?</Text>
          <TouchableOpacity 
            onPress={handleSubmit} 
            disabled={isSubmitting}
            style={[styles.postButton, isSubmitting && styles.disabledButton]}
          >
            <Text style={styles.postButtonText}>
              {isSubmitting ? 'Posting...' : 'Post'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.userInfo}>
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} 
            style={styles.avatar}
          />
          <Text style={styles.username}>Your Name</Text>
        </View>

        <TextInput
          style={styles.postInput}
          placeholder="What's on your mind?"
          multiline
          value={postText}
          onChangeText={setPostText}
          placeholderTextColor="#999"
        />

        {images.length > 0 && (
          <View style={styles.imagePreviewContainer}>
            {images.map((uri, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image source={{ uri }} style={styles.imagePreview} />
                <TouchableOpacity 
                  style={styles.removeImageButton}
                  onPress={() => removeImage(index)}
                >
                  <Ionicons name="close-circle" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <View style={styles.optionsContainer}>
          <Text style={styles.sectionTitle}>Add to your post</Text>
          <View style={styles.optionButtons}>
            <TouchableOpacity style={styles.optionButton} onPress={pickImage}>
              <Ionicons name="image" size={24} color="green" />
              <Text style={styles.optionText}>Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionButton}>
              <Ionicons name="person-add" size={24} color="blue" />
              <Text style={styles.optionText}>Tag</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionButton}>
              <Ionicons name="location" size={24} color="red" />
              <Text style={styles.optionText}>Location</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.privacyContainer}>
          <TouchableOpacity style={styles.privacyButton}>
            <Ionicons name="earth" size={20} color="black" />
            <Text style={styles.privacyText}>Public</Text>
            <Ionicons name="chevron-down" size={16} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postButton: {
    backgroundColor: '#1877f2',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#b3d4fc',
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postInput: {
    paddingHorizontal: 15,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  imageWrapper: {
    width: '33%',
    padding: 5,
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 5,
  },
  removeImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  optionsContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginVertical: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f2f5',
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  optionText: {
    marginLeft: 5,
  },
  privacyContainer: {
    paddingHorizontal: 15,
  },
  privacyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f2f5',
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  privacyText: {
    marginHorizontal: 5,
  },
});

export default CreatePostScreen;