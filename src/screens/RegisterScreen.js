import React, { useState } from "react";
import { Alert, Text, TextInput, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conpassword, setConpassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [gender, setGender] = useState("");

    const handleData = async () => {
        if (!name || !email || !password || !conpassword || !mobile || !gender) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        if (name[0] !== name[0].toUpperCase()) {
            Alert.alert("Error", "Name should start with a capital letter");
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert("Invalid Email", "Must be lowercase, include number, and end with @gmail.com");
            return;
        }

        if (!validatePassword(password)) {
            Alert.alert(
                "Invalid Password",
                "Min 8 chars, 1 uppercase, 1 number, 1 special char"
            );
            return;
        }

        if (password !== conpassword) {
            Alert.alert("Password Mismatch", "Passwords do not match");
            return;
        }

        if (!/^\d{10}$/.test(mobile)) {
            Alert.alert("Invalid Mobile Number", "Mobile number must be exactly 10 digits");
            return;
        }

        // Save user details
        const newUser = { name, email, password, mobile, gender };
        try {
            const existingUsersRaw = await AsyncStorage.getItem('registeredUsers');
            const existingUsers = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];
            
            // Check if email already registered
            const userExists = existingUsers.find(u => u.email === email);
            if (userExists) {
                Alert.alert("Error", "Email is already registered!");
                return;
            }

            existingUsers.push(newUser);
            await AsyncStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
            
            Alert.alert("Success", "Registered Successfully");
            navigation.navigate("Login");
        } catch (error) {
            Alert.alert("Error", "Failed to save user data");
        }
    }

    const validateEmail = (email) => {
        if (email !== email.toLowerCase()) return false;
        if (!email.endsWith("@gmail.com")) return false;

        let hasNumber = false;
        for (let i = 0; i < email.length; i++) {
            if (!isNaN(Number(email[i])) && email[i] !== ' ') {
                hasNumber = true;
                break;
            }
        }
        return hasNumber;
    };

    const validatePassword = (password) => {
        if (password.length < 8) return false;

        let hasUpper = false;
        let hasNumber = false;
        let hasSpecial = false;

        const specialChars = "@#$%^&*";

        for (let i = 0; i < password.length; i++) {
            const char = password[i];
            if (char >= "A" && char <= "Z") hasUpper = true;
            else if (!isNaN(Number(char)) && char !== ' ') hasNumber = true;
            else if (specialChars.includes(char)) hasSpecial = true;
        }

        return hasUpper && hasNumber && hasSpecial;
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={styles.title}>Register</Text>
                <Text style={styles.subtitle}>Create your Poojai Store account</Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput 
                        style={styles.input} 
                        value={name} 
                        onChangeText={setName} 
                        placeholder="e.g. John Doe" 
                        placeholderTextColor="#999" 
                    />
                </View>

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
                        placeholder="Min 8 chars, 1 Upper, 1 Number, 1 Special" 
                        placeholderTextColor="#999" 
                        secureTextEntry 
                    />
                </View>
                
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput 
                        style={styles.input} 
                        value={conpassword} 
                        onChangeText={setConpassword} 
                        placeholder="Re-enter your password" 
                        placeholderTextColor="#999" 
                        secureTextEntry 
                    />
                </View>
                
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Mobile Number</Text>
                    <TextInput 
                        style={styles.input} 
                        value={mobile} 
                        onChangeText={setMobile} 
                        keyboardType="numeric" 
                        maxLength={10} 
                        placeholder="10 digit number" 
                        placeholderTextColor="#999" 
                    />
                </View>
                
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Gender</Text>
                    <TextInput 
                        style={styles.input} 
                        value={gender} 
                        onChangeText={setGender} 
                        placeholder="Male, Female, or Other" 
                        placeholderTextColor="#999" 
                    />
                </View>
                
                <TouchableOpacity style={styles.primaryButton} onPress={handleData}>
                    <Text style={styles.primaryButtonText}>Register</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.secondaryButtonText}>Already have an account? Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    header: {
        alignItems: "center", 
        marginBottom: 30,
        marginTop: 20,
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
        marginBottom: 15,
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
        marginTop: 15,
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
        marginTop: 5,
    },
    secondaryButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
    }
});

export default RegisterScreen;
