import { useEffect, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import colors from '../constants/Colors'; // Make sure to define your colors

const VerificationScreen = ({ email, onVerificationSuccess, onResendCode }) => {
  const [codes, setCodes] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(80);
  const [isCodeExpired, setIsCodeExpired] = useState(false);
  const inputs = useRef([]);

  // Mask the email (e.g., "user@example.com" -> "us****@ex****.com")
  const maskedEmail = () => {
    const [name, domain] = email.split('@');
    const [domainName, tld] = domain.split('.');
    
    const maskedName = name.substring(0, 2) + '*'.repeat(name.length - 2);
    const maskedDomain = domainName.substring(0, 2) + '*'.repeat(domainName.length - 2);
    
    return `${maskedName}@${maskedDomain}.${tld}`;
  };

  // Handle countdown timer
  useEffect(() => {
    const timer = countdown > 0 && setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);
    
    if (countdown === 0) {
      setIsCodeExpired(true);
      Alert.alert(
        'Code Expired',
        'The verification code has expired. You will be redirected to sign up.',
        [{ text: 'OK', onPress: () => onVerificationSuccess(false) }]
      );
    }
    
    return () => clearInterval(timer);
  }, [countdown, onVerificationSuccess]);

  // Handle code input change
  const handleCodeChange = (text, index) => {
    // Only allow numeric input
    const numericText = text.replace(/[^0-9]/g, '');
    
    const newCodes = [...codes];
    newCodes[index] = numericText.slice(0, 1); // Only take first character
    setCodes(newCodes);
    
    // Auto-focus next input if a digit was entered
    if (numericText && index < 5) {
      inputs.current[index + 1].focus();
    }
    
    // Check if all fields are filled
    if (newCodes.every(code => code !== '') && index === 5) {
      verifyCode(newCodes.join(''));
    }
  };

  // Handle backspace
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !codes[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  // Verify the code
  const verifyCode = async (fullCode) => {
    setLoading(true);
    try {
      // Here you would typically call your verification API
      const isValid = await verifyCodeWithBackend(fullCode);
      
      if (isValid) {
        onVerificationSuccess(true);
      } else {
        // Show red borders for incorrect code
        Alert.alert('Invalid Code', 'The verification code you entered is incorrect.');
        setCodes(['', '', '', '', '', '']);
        inputs.current[0].focus();
      }
    } catch (_error) {
      Alert.alert('Error', 'An error occurred during verification.');
    } finally {
      setLoading(false);
    }
  };

  // Resend verification code
  const handleResendCode = async () => {
    setLoading(true);
    try {
      await onResendCode();
      setCodes(['', '', '', '', '', '']);
      setCountdown(80);
      setIsCodeExpired(false);
      inputs.current[0].focus();
      Alert.alert('Code Sent', 'A new verification code has been sent to your email.');
    } catch (_error) {
      Alert.alert('Error', 'Failed to resend verification code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.subTitle}>
        We have sent a verification code to {maskedEmail()}
      </Text>
      
      <View style={styles.codeContainer}>
        {codes.map((code, index) => (
          <TextInput
            key={index}
            ref={ref => inputs.current[index] = ref}
            style={[
              styles.codeInput,
              code && styles.codeInputFilled,
              isCodeExpired && styles.codeInputExpired
            ]}
            value={code}
            onChangeText={(text) => handleCodeChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            placeholder=""
            placeholderTextColor={colors.primary100}
            keyboardType="numeric"
            maxLength={1}
            editable={!loading && !isCodeExpired}
            selectTextOnFocus
          />
        ))}
      </View>
      
      <View style={styles.resendContainer}>
        <Text style={styles.countdownText}>
          {isCodeExpired ? 'Code expired' : `Expires in ${countdown}s`}
        </Text>
        <Pressable
          style={[styles.resendButton, (loading || countdown > 0) && styles.resendButtonDisabled]}
          onPress={handleResendCode}
          disabled={loading || countdown > 0}
        >
          <Text style={styles.resendButtonText}>
            {loading ? 'Sending...' : 'Resend Code'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

// Mock verification function - replace with your actual API call
const verifyCodeWithBackend = async (code) => {
  // Simulate API call
  return new Promise(resolve => {
    setTimeout(() => {
      // In a real app, you would validate against your backend
      resolve(code.length === 6 && /^\d+$/.test(code));
    }, 1000);
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'l',
    // justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.black,
  },
  subTitle: {
    fontSize: 16,
    // textAlign: 'center',
    marginBottom: 30,
    color: colors.grey,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
    marginBottom: 30,
    width: '80%',
  },
  codeInput: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: colors.grey2,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    color: colors.black,
    gap: 10
  },
  codeInputFilled: {
    borderColor: colors.success, // Green border for filled inputs
    backgroundColor: colors.lightSuccess, // Light green background
  },
  codeInputExpired: {
    borderColor: colors.error, // Red border when expired
  },
  countdownText: {
    fontSize: 14,
    color: colors.grey,
    marginBottom: 10,
  },
  resendButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    backgroundColor: colors.primary,
    width: 150,
    height: 40,
    borderRadiu: '60%'
  },
  resendButtonDisabled: {
    backgroundColor: colors.grey2,
  },
  resendButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    justifyContent: 'center'
  },
});

export default VerificationScreen;