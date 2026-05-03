import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { restoreUser } from '../redux/authSlice';
import { View, ActivityIndicator, Text } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProductsScreen from '../screens/ProductsScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryProductsScreen from '../screens/CategoryProductsScreen';

import { RootState, AppDispatch } from '../redux/store';
import { RootStackParamList, MainTabParamList, CategoryStackParamList } from '../types/types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();
const CategoryStack = createNativeStackNavigator<CategoryStackParamList>();

const CategoryStackScreen = () => {
  return (
    <CategoryStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#D84315' }, headerTintColor: '#fff' }}>
      <CategoryStack.Screen name="CategoriesList" component={CategoriesScreen} options={{ title: 'Categories' }} />
      <CategoryStack.Screen name="CategoryProducts" component={CategoryProductsScreen} options={({ route }) => ({ title: route.params.categoryName })} />
    </CategoryStack.Navigator>
  );
};

const MainTabs = () => {
  const cartItems = useSelector((state: RootState) => state.cart.totalQuantity);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: '#D84315' },
        headerTintColor: '#fff',
        tabBarActiveTintColor: '#D84315',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => {
          let iconSymbol;
          if (route.name === 'Home') iconSymbol = '🏠';
          else if (route.name === 'Categories') iconSymbol = '🗂️';
          else if (route.name === 'Search') iconSymbol = '🔍';
          else if (route.name === 'Cart') iconSymbol = '🛒';
          else if (route.name === 'Profile') iconSymbol = '👤';
          return <Text style={{ fontSize: 20 }}>{iconSymbol}</Text>;
        },
      })}
    >
      <Tab.Screen name="Home" component={ProductsScreen} options={{ title: 'Poojai Items' }} />
      <Tab.Screen name="Categories" component={CategoryStackScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{ tabBarBadge: cartItems > 0 ? cartItems : undefined }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          dispatch(restoreUser(JSON.parse(storedUser)));
        } else {
          dispatch(restoreUser(null));
        }
      } catch (error) {
        dispatch(restoreUser(null));
      }
    };
    checkUser();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#D84315" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
