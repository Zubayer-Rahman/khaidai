import { Link, router } from 'expo-router';
import { useEffect } from 'react';
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../constants/Colors';


const SplashScreen = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/LogIn'); 
    }, 3000000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../assets/images/splash-screen.svg')} 
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
                  
          <View style={styles.content}>
            <Image source={require('../assets/images/chef-hat-icon.svg')} style={{marginBottom: 20, marginTop: 100 }}></Image>
            <Text style={styles.premiumText}>100K+ Premium Recipe</Text>
            <View style={{paddingTop:50, paddingBottom: 50, alignItems: 'center'}}>
              <Text style={styles.cookingText}>KhaoDao</Text>
              <Text style={styles.subtitle}>Simple way to find Tasty Recipe</Text>
            </View>
            
            <Pressable style={styles.button} >
              <Text style={styles.buttonText}>{' '}
                <Link href='/LogIn'>
                  Start Cooking
                </Link>
              </Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    padding: 20,
  },
  timeContainer: {
    marginTop: 50,
    alignItems: 'flex-end',
  },
  timeText: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 100,
    alignItems: 'center',
  },
  premiumText: {
    color: colors.textLight,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  cookingText: {
    color: colors.textLight,
    fontSize: 60,
    fontWeight: 'bold',
    lineHeight: 60,
    marginBottom: 20,
    paddingTop:50,
  },
  subtitle: {
    color: colors.textLight,
    fontSize: 16,
    marginBottom: 40,
  },
  button: {
    backgroundColor: colors.primary100,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 80,
    width: 243,
    height: 54,
  },
  buttonText: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  rightArrow: {
    width: 10,
    height: 10,
    position: 'absolute',
    right: 50,
    top: 23,
  },
});

export default SplashScreen;