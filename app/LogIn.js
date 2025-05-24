import { ImageBackground } from 'expo-image';
import { Link } from 'expo-router';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import colors from '../constants/Colors';

export default function TestScreen() {
  return (
    <ImageBackground style={styles.background}>
      <View style={styles.contentContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.mainHeading}>Hello,</Text>
          <Text style={styles.subHeading}>Welcome Back!</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput 
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Email"
            placeholderTextColor={colors.grey2}
            autoCapitalize="none"
          />

          <Text style={styles.inputLabel}>Password</Text>
          <TextInput 
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Password"
            placeholderTextColor={colors.grey2}
            autoCapitalize="none"
            secureTextEntry
          />

          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        
        <Link href="/HomeScreen" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </Link>

        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>Or Sign In With</Text>
        </View>

        <View style={styles.iconContainer}> 
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={require('../assets/images/google-icon.png')}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={require('../assets/images/facebook-icon.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don not have an account? </Text>
          <Link href="/SignUp" asChild>
            <TouchableOpacity>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headingContainer: {
    // padding: 20,
    marginTop: 120,
    marginBottom: 20,
  },
  mainHeading: {
    color: colors.black,
    fontSize: 30,
    fontWeight: '700',
    fontFamily: 'Poppins',
  },
  subHeading: {
    color: colors.black,
    fontSize: 24,
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  formContainer: {
    marginBottom: 20,
    marginTop: 30,

  },
  input: {
    height: 50,
    width: '100%',
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.grey2,
    borderRadius: 10,
    fontSize: 16,
  },
  inputLabel: {
    marginLeft: 5,
    marginBottom: 5,
    color: colors.black,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Poppins',
  },
  forgotPassword: {
    marginLeft: 5,
    color: colors.golden,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Poppins',
  },
  button: {
    height: 50,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary100,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  optionContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  optionText: {
    color: colors.grey3,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Poppins',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white2,
    borderRadius: 15,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Poppins',
  },
  signupLink: {
    color: colors.golden,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
});