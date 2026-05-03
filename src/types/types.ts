import { NavigatorScreenParams } from '@react-navigation/native';

export interface Product {
  id: string;
  name: string;
  unit: string;
  price: number;
  category: string;
  image: any; // React Native require() returns a number/any
}

export interface CartItem extends Product {
  quantity: number;
  totalPrice: number;
}

export interface User {
  name: string;
  email: string;
  mobile: string;
  gender: string;
  password?: string;
}

// Navigation Types
export type MainTabParamList = {
  Home: undefined;
  Categories: undefined;
  Search: undefined;
  Cart: undefined;
  Profile: undefined;
};

export type CategoryStackParamList = {
  CategoriesList: undefined;
  CategoryProducts: { categoryName: string };
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  Login: undefined;
  Register: undefined;
};
