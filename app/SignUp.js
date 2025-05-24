import { Checkbox } from 'expo-checkbox'; // Changed to expo-checkbox
import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import colors from '../constants/Colors';


export default function SignUp() {
    const [isSelected, setSelection] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <Text style={styles.title}>
                    Create an account
                </Text>
                <Text style={styles.subTitle}>
                    Lets help you set up your account, it wont take long.
                </Text>
            </View>
            
            <View style={styles.body}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput 
                    style={styles.input}
                    value={formData.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                    placeholder="Name"
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
                    placeholderTextColor={colors.grey2}
                    secureTextEntry
                    autoCapitalize="none"
                />

                <Text style={styles.inputLabel}>Confirm Password</Text>
                <TextInput 
                    style={styles.input}
                    value={formData.confirmPassword}
                    onChangeText={(text) => handleInputChange('confirmPassword', text)}
                    placeholder="Confirm Password"
                    placeholderTextColor={colors.grey2}
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
                        {isSelected ? "Terms and Conditions Accepted" : "Accept Terms and Conditions"}
                    </Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Link href="/HomeScreen" asChild>
                    <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </Link>
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
                    />
                </TouchableOpacity>
        
                <TouchableOpacity style={styles.iconButton}>
                    <Image
                        source={require('../assets/images/facebook-icon.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
    
            <View>
                <Text style={styles.otherOptionText}>
                    Already a member? {' '} 
                    <TouchableOpacity>
                        <Link href="/LogIn" style={{ color: colors.golden, fontWeight: 600 }}>
                        Sign In
                        </Link>
                    </TouchableOpacity>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingBottom:40,
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
        fontfamily: 'Poppins, sans serif',
        backgroundColor: '#fff'
    },
    heading: {
        marginBottom: 15
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        lineHeight: 40,
        marginBottom: 5,
        fontFamily: 'Poppins-Bold'
    },
    subTitle: {
        fontSize: 17,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular'
    },
    body: {
        marginBottom: 5
    },
    input: {
        height: 60,
        width: '100%',
        marginBottom: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: colors.grey3,
        borderRadius: 10,
        fontFamily: 'Poppins-Regular'
    },
    inputLabel: {
        paddingTop: 10,
        paddingBottom: 10, 
        color: colors.black, 
        fontSize: 16, 
        fontWeight: '400',
        fontFamily: 'Poppins-Regular'
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center'
    },
    checkbox: {
        marginRight: 8,
        width: 20,
        height: 20
    },
    label: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
        flex: 1
    },
    buttonContainer: {
        position: 'relative',
        marginBottom: 10
    },
    button: {
        height: 50,
        backgroundColor: colors.primary100,
        // paddingVertical: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    buttonDisabled: {
        opacity: 0.5
    },
    buttonText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Poppins-Medium'
    },
    rightArrow: {
        width: 10,
        height: 10,
        marginLeft: 10
    },
    optionContainer: {
        padding: 10, 
        alignSelf: 'center',  
    },
    optionText: {
        color: colors.grey3,
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'Poppins-Regular'
    },
    iconContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        gap: 10,
    },
    icon: {
        width: 30,
        height: 30
    },
    iconButton: { 
        width: 50, 
        height: 50, 
        backgroundColor: colors.white2,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    otherOptionText: { 
        paddingLeft: 20,
        paddingRight: 20, 
        color: colors.black, 
        fontSize: 16, 
        fontWeight: '400',
        fontFamily: 'Poppins-Regular',
        textAlign: 'center'
    }
});