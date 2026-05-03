import React, { useState } from "react";
import { Alert, Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill both fields");
            return;
        }
        
        try {
            const existingUsersRaw = await AsyncStorage.getItem('registeredUsers');
            const existingUsers = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];
            
            const validUser = existingUsers.find(u => u.email === email && u.password === password);
            
            if (validUser) {
                dispatch(login({ email: validUser.email, name: validUser.name }));
            } else {
                Alert.alert("Login Failed", "Please enter the correct email and password");
            }
        } catch (error) {
            Alert.alert("Error", "Failed to login");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.subtitle}>Welcome back to Poojai Store</Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput 
                        style={styles.input}
                        value={email} 
                        onChangeText={setEmail} 
                        placeholder="abc123@gmail.com" 
                        placeholderTextColor="#999" 
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                </View>
                
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput 
                        style={styles.input}
                        value={password} 
                        onChangeText={setPassword} 
                        placeholder="Enter your password" 
                        placeholderTextColor="#999" 
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
                    <Text style={styles.primaryButtonText}>Login</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.secondaryButtonText}>Create an Account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "#fff",
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    header: {
        alignItems: "center", 
        marginBottom: 40,
    },
    title: {
        fontWeight: "bold", 
        fontSize: 32,
        color: '#D84315',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        color: "#333",
        marginBottom: 8,
        fontWeight: '600',
        fontSize: 14,
    },
    input: {
        backgroundColor: "#fafafa", 
        color: "#333", 
        height: 50, 
        paddingHorizontal: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
    },
    primaryButton: {
        backgroundColor: '#D84315',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryButton: {
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    secondaryButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
    }
});

export default LoginScreen;
