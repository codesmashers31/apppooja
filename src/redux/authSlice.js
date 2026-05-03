import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    login: (state, action) => {
      state.user = action.payload;
      AsyncStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      AsyncStorage.removeItem('user');
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      AsyncStorage.setItem('user', JSON.stringify(state.user));
    },
    restoreUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setLoading, login, logout, restoreUser, updateUser } = authSlice.actions;
export default authSlice.reducer;
