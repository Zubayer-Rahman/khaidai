import { useSignUp } from '@clerk/clerk-expo';
import { Checkbox } from 'expo-checkbox';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import EmailVerification from '../../components/EmailVerfication';
import colors from '../../constants/Colors';

export default function SignUp() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isSelected, setSelection] = useState(false);
    const [pendingVerification, setPendingVerification] = useState(false);
    // const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSignUp = async () => {
    if (!isLoaded) {
        Alert.alert('Error', 'Authentication service not ready');
        return;
    }

    if (!isSelected) {
        Alert.alert('Error', 'You must accept the terms and conditions');
        return;
    }

    if (formData.password !== formData.confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
    }

    setLoading(true);

    try {
        // Corrected sign-up creation without firstName
        await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
        });

        // Set username after initial sign-up if needed
        if (formData.name) {
        await signUp.update({
            username: formData.name, // Use username instead of firstName
        });
        }

        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
        setPendingVerification(true);
         } catch (err) {
            console.error(JSON.stringify(err, null, 2));
            Alert.alert('Error', err.errors?.[0]?.message || 'Sign up failed');
        } finally {
        setLoading(false);
        }
    };

    const handleVerifyEmail = async (success, verificationCode) => {
        if (!success) {
            setPendingVerification(false);
            return;
        }

        setLoading(true);
        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: verificationCode,
            });

            if (completeSignUp.status === 'complete') {
                await setActive({ session: completeSignUp.createdSessionId });
                router.replace('/HomeScreen');
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
            Alert.alert('Error', err.errors?.[0]?.message || 'Verification failed');
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        setLoading(true);
        try {
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            Alert.alert('Success', 'A new verification code has been sent to your email.');
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
            Alert.alert('Error', err.errors?.[0]?.message || 'Failed to resend verification code');
        } finally {
            setLoading(false);
        }
    };

    if (pendingVerification) {
        return (
            <EmailVerification
                email={formData.email}
                onVerificationSuccess={(success, code) => handleVerifyEmail(success, code)}
                onResendCode={handleResendCode}
            />
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <Text style={styles.title}>Create an account</Text>
                <Text style={styles.subTitle}>Lets help you set up your account, it wont take long.</Text>
            </View>
            
            <View style={styles.body}>
                <Text style={styles.inputLabel}>User Name</Text>
                <TextInput 
                    style={styles.input}
                    value={formData.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                    placeholder="User Name"
                    placeholderTextColor={colors.grey2}
                />
        
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput 
                    style={styles.input}
                    value={formData.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                    placeholder="Email"
                    placeholderTextColor={colors.grey2}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.inputLabel}>Password</Text>
                <TextInput 
                    style={styles.input}
                    value={formData.password}
                    onChangeText={(text) => handleInputChange('password', text)}
                    placeholder="Password"
                    secureTextEntry
                    placeholderTextColor={colors.black}
                    autoCapitalize="none"
                />

                <Text style={styles.inputLabel}>Confirm Password</Text>
                <TextInput 
                    style={styles.input}
                    value={formData.confirmPassword}
                    onChangeText={(text) => handleInputChange('confirmPassword', text)}
                    placeholder="Confirm Password"
                    placeholderTextColor={colors.black}
                    secureTextEntry
                    autoCapitalize="none"
                />

                <View style={styles.checkboxContainer}>
                    <Checkbox
                        value={isSelected}
                        onValueChange={setSelection}
                        style={styles.checkbox}
                        color={isSelected ? colors.primary100 : undefined}
                    />
                    <Text style={styles.label}>
                        Accept Terms and Conditions
                    </Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable 
                    style={[styles.button, (!isSelected || loading) && styles.buttonDisabled]}
                    onPress={handleSignUp}
                    disabled={!isSelected || loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </Text>
                </Pressable>
            </View>

            <View style={styles.optionContainer}>
                <Text style={styles.optionText}>Or Sign In With</Text>
            </View>
    
            <View style={styles.iconContainer}> 
                <Pressable style={styles.iconButton}>
                    <Image
                        source={require('../../assets/images/google-icon.png')}
                        style={styles.icon}
                    />
                </Pressable>
        
                <Pressable style={styles.iconButton}>
                    <Image
                        source={require('../../assets/images/facebook-icon.png')}
                        style={styles.icon}
                    />
                </Pressable>
            </View>
    
            <View style={styles.footer}>
                <Text style={styles.footerText}>Already a member? </Text>
                <Link href="/LogIn" asChild>
                    <Pressable>
                        <Text style={styles.footerLink}>Sign In</Text>
                    </Pressable>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    heading: {
        marginBottom: 20
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 8,
    },
    subTitle: {
        fontSize: 14,
        fontWeight: '400',
        color: colors.grey2
    },
    body: {
        marginBottom: 20
    },
    input: {
        height: 50,
        width: '100%',
        marginBottom: 15,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: colors.grey3,
        borderRadius: 8,
    },
    inputLabel: {
        marginBottom: 8,
        color: colors.black,
        fontSize: 14,
        fontWeight: '500'
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    checkbox: {
        marginRight: 12,
        width: 20,
        height: 20
    },
    label: {
        fontSize: 14,
        color: colors.black,
    },
    buttonContainer: {
        marginBottom: 20
    },
    button: {
        height: 50,
        backgroundColor: colors.primary100,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonDisabled: {
        opacity: 0.6
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600'
    },
    optionContainer: {
        marginVertical: 10,
        alignItems: 'center'
    },
    optionText: {
        color: colors.grey3,
        fontSize: 14
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 10
    },
    icon: {
        width: 24,
        height: 24
    },
    iconButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white2,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.grey3
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        // marginTop: 20
    },
    footerText: {
        color: colors.black,
        fontSize: 14
    },
    footerLink: {
        color: colors.primary100,
        fontSize: 14,
        fontWeight: '600'
    }
});