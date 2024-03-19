

import { createSlice } from "@reduxjs/toolkit";

import CryptoJS from 'crypto-js';

// Secret key for encryption/decryption (should be kept secure)
const SECRET_KEY = import.meta.env.VITE_STORAGE_SECRET_KEY as string;

// Function to encrypt a JSON string
const encryptData = (jsonString: string | CryptoJS.lib.WordArray) => {
  try {
    const encryptedData = CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
    return encryptedData;
  } catch (error) {
    console.error('Error encrypting data:', error);
    return 'null';
  }
};

// Function to decrypt an encrypted string
const decryptData = (encryptedString: string | CryptoJS.lib.CipherParams) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedString, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  } catch (error) {
    console.error('Error decrypting data:', error);
    return 'null';
  }
};


// Load initial state from local storage
const persistedState = localStorage.getItem('authState');


const initialState = persistedState && (decryptData(persistedState) !== 'null') ? (() => {
  try
  {
    return JSON.parse(decryptData(persistedState));
  }
  catch (error)
  {
    console.error('Error parsing decrypted data:');
    return { user: null, isLogined: false, auth_token: null , refresh_token: null,expires_in:null };
  }
})() : { user: null, isLogined: false,auth_token: null , refresh_token: null ,expires_in: null};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.auth_token = action.payload.auth_token;
            state.refresh_token = action.payload.refresh_token;
            state.expires_in = Date.now()+action.payload.expires_in* 1000;
            state.isLogined = true;
            // Save state to local storage
            localStorage.setItem('authState', encryptData(JSON.stringify(state)));
        },
        logout: (state) => {
            state.user = null;
            state.isLogined = false;
            // Clear state from local storage
            localStorage.removeItem('authState');
        }
    }
});

export const { login, logout } = authSlice.actions;

const authReducers = authSlice.reducer;

export default authReducers;
