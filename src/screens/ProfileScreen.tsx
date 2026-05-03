import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout, updateUser } from '../redux/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState, AppDispatch } from '../redux/store';
import { User } from '../types/types';

const ProfileScreen = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [mobile, setMobile] = useState(user?.mobile || '');
  const [gender, setGender] = useState(user?.gender || '');

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSave = async () => {
    if (!name || !email) {
      Alert.alert("Error", "Name and Email cannot be empty.");
      return;
    }

    try {
      const existingUsersRaw = await AsyncStorage.getItem('registeredUsers');
      let existingUsers: User[] = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];

      const userIndex = existingUsers.findIndex(u => u.email === user?.email);

      if (userIndex !== -1) {
        const updatedUserData = {
          ...existingUsers[userIndex],
          name,
          email,
          mobile,
          gender
        };
        existingUsers[userIndex] = updatedUserData;
        
        await AsyncStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
        
        dispatch(updateUser({ name, email, mobile, gender }));
        Alert.alert("Success", "Profile updated successfully!");
        setIsEditing(false);
      } else {
        Alert.alert("Error", "User not found in database.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update profile.");
    }
  };

  const handleCancel = () => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setMobile(user?.mobile || '');
    setGender(user?.gender || '');
    setIsEditing(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{name ? name.charAt(0).toUpperCase() : 'U'}</Text>
        </View>
        {!isEditing && (
          <>
            <Text style={styles.name}>{user?.name || 'User'}</Text>
            <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
          </>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <View style={styles.fieldRow}>
          <Text style={styles.label}>Name</Text>
          {isEditing ? (
            <TextInput style={styles.input} value={name} onChangeText={setName} />
          ) : (
            <Text style={styles.value}>{user?.name}</Text>
          )}
        </View>

        <View style={styles.fieldRow}>
          <Text style={styles.label}>Email (Cannot be changed)</Text>
          <Text style={[styles.value, { color: '#888' }]}>{user?.email}</Text>
        </View>

        <View style={styles.fieldRow}>
          <Text style={styles.label}>Mobile</Text>
          {isEditing ? (
            <TextInput style={styles.input} value={mobile} onChangeText={setMobile} keyboardType="numeric" maxLength={10} />
          ) : (
            <Text style={styles.value}>{user?.mobile || 'Not provided'}</Text>
          )}
        </View>

        <View style={styles.fieldRow}>
          <Text style={styles.label}>Gender</Text>
          {isEditing ? (
            <TextInput style={styles.input} value={gender} onChangeText={setGender} />
          ) : (
            <Text style={styles.value}>{user?.gender || 'Not provided'}</Text>
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {isEditing ? (
          <>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.btnText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.editBtn} onPress={() => setIsEditing(true)}>
              <Text style={styles.btnText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
              <Text style={styles.btnText}>Logout</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#D84315',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  avatarText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D84315',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  fieldRow: {
    marginBottom: 15,
  },
  label: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  buttonContainer: {
    width: '100%',
  },
  editBtn: {
    backgroundColor: '#D84315',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  saveBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  logoutBtn: {
    backgroundColor: '#ff5252',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#999',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelBtnText: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen;
