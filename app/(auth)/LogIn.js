import { useSignIn } from '@clerk/clerk-expo';
import { ImageBackground } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import colors from '../../constants/Colors';

export default function TestScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const showErrorAlert = (message) => {
    Alert.alert(
      'Login Failed',
      message,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: true }
    );
  };

  const handleLogIn = async () => {
    if (!isLoaded) {
      showErrorAlert('Authentication service not ready');
      return;
    }

    if (!emailAddress || !password) {
      showErrorAlert('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/HomeScreen');
      } else {
        showErrorAlert('Sign-in failed. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      let errorMessage = 'Invalid credentials. Please try again.';
      if (err.errors && err.errors[0]) {
        errorMessage = err.errors[0].message;
      }
      showErrorAlert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
            placeholder="Email"
            placeholderTextColor={colors.grey2}
            autoCapitalize="none"
            keyboardType="email-address"
            value={emailAddress}
            onChangeText={setEmailAddress}
            editable={!loading}
          />

          <Text style={styles.inputLabel}>Password</Text>
          <TextInput 
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={colors.grey2}
            autoCapitalize="none"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />

          <Pressable onPress={() => router.push('/ResetPassword')}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </Pressable>
        </View>
        
        <Pressable 
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogIn}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Signing In...' : 'Log In'}
          </Text>
        </Pressable>

        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>Or Sign In With</Text>
        </View>

        <View style={styles.iconContainer}> 
          <Pressable style={styles.iconButton} disabled={loading}>
            <Image
              source={require('../../assets/images/google-icon.png')}
              style={styles.icon}
            />
          </Pressable>

          <Pressable style={styles.iconButton} disabled={loading}>
            <Image
              source={require('../../assets/images/facebook-icon.png')}
              style={styles.icon}
            />
          </Pressable>
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Dont have an account? </Text>
          <Link href="/SignUp" asChild>
            <Pressable disabled={loading}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </Pressable>
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
  buttonDisabled: {
    opacity: 0.6,
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