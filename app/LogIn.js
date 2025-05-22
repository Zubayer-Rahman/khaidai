import { ImageBackground } from 'expo-image';
import { Link } from 'expo-router';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import colors from '../constants/Colors';

export default function TestScreen() {
  return (
    <ImageBackground>
      <View style={styles.headingContainer}>
        <Text style={{ color: colors.black, fontSize: 30, fontWeight: '700' }}>
          Hello,
        </Text>
        <Text style={{ color: colors.black, fontSize: 24, fontWeight: '500' }}>
          Welcome Back!
        </Text>
      </View>

      <View>
        <Text style={styles.inputLabel}>
          Email
        </Text>
        <TextInput 
        style = {styles.input}
        underlineColorAndroid = "transparent"
        placeholder = "Email"
        placeholderTextColor = {colors.grey2}
        autoCapitalize = "none"/>

        <Text style={styles.inputLabel}>
          Password
        </Text>
        <TextInput 
        style = {styles.input}
        underlineColorAndroid = "transparent"
        placeholder = "Password"
        placeholderTextColor = {colors.grey2}
        autoCapitalize = "none"/>

        <Text style={{ paddingLeft: 20, color: colors.golden, fontSize: 16, fontWeight: '400'}}>
          Forgot Password?
        </Text>
      </View>
      
      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{' '}
            <Link href="/HomeScreen" style={{ color: colors.white }}>
            LogIn
            </Link>
          </Text>
        </TouchableOpacity>
        <Image source={require('../assets/images/right-arrow-icon.png')}
        style={styles.rightArrow}></Image>
      </View>

      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>
          Or Sign In With
        </Text>
      </View>

      <View style={styles.iconContainer}> 
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={require('../assets/images/google-icon.png')}
            style={styles.icon}
          ></Image>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={require('../assets/images/facebook-icon.png')}
            style={styles.icon}
          >
          </Image>
        </TouchableOpacity>
      </View>


      <View style={styles.container}>
        <Text style={styles.otherOptionText}>
          Don nott have an account?{' '}
          <TouchableOpacity>
            <Link href="/SignUp" style={{ color: colors.golden }}>
            Sign Up
            </Link>
          </TouchableOpacity>
        </Text> 
      </View>
      
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  headingContainer:{
    padding: 20, 
    fontfamily: 'Poppins, sans serif', 
    marginTop: 60, 
    marginBottom: 20 
  },
  input: {
    height: 60,
    width: '90%',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.grey2,
    borderRadius: 10,
    marginLeft: 20,
  },

  inputLabel:{
    padding: 20, 
    color: colors.black, 
    fontSize: 16, 
    fontWeight: '400'
  },

  button: {
    height: 50,
    backgroundColor: colors.primary100,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
    marginLeft: 20,
  },

  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '500',
    justifySelf: 'center',
  },

  rightArrow:{
    width: 10,
    height: 10,
    position: 'absolute',
    right: 160,
    top: 40,
  },

  optionContainer:{
    padding: 20, 
    fontfamily: 'Poppins, sans serif',
    alignSelf: 'center',  
    marginBottom: 20,
  },

  optionText: {
    color: colors.grey3,
    fontSize: 14,
    fontWeight: '400',
    alignSelf: 'center',
  },

  iconContainer:{
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    gap: 10
  },

  icon:{
    width: 30,
    height: 30,
    marginTop: 10,
    alignSelf: 'center',
  },

  iconButton:{ 
    width: 50, 
    height: 50, 
    backgroundColor: colors.white2,
    borderRadius: 15, 
  },

  otherOptionText:{ padding: 20, color: colors.black, fontSize: 16, fontWeight: '400', alignSelf: 'center'},
});