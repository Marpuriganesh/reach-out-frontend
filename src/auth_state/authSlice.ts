

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import CryptoJS from 'crypto-js';
import { Dispatch } from 'redux';

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
    const data = JSON.parse(decryptData(persistedState));
    if (data.expires_in < Date.now())
    {
      return { user: null, isLogined: false, auth_token: null , refresh_token: null,expires_in:null };
    }
    return data;
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
          state.auth_token = null;
          state.refresh_token = null;
          state.expires_in = null;
          localStorage.removeItem('authState');
        }
    }
});

export const { login, logout } = authSlice.actions;

const authReducers = authSlice.reducer;

export default authReducers;

export const revokeToken = (refreshToken:string,authToken:string) => {
  const revokeOptions = {
      method: 'post',
      url: import.meta.env.VITE_REVOKE_URL,
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
      },
      data: {
          client_id: import.meta.env.VITE_CLIENT_ID,
          client_secret: import.meta.env.VITE_CLIENT_SECRET,
          token: refreshToken
      }
  };

  return axios.request(revokeOptions);
};

// Logout action creator with async logic
export const logoutAsync = (refreshToken:string,authToken:string) => (dispatch:Dispatch) => {
  // Revoke token before logging out
  revokeToken(refreshToken,authToken)
      .then(response => {
          console.log(response.data);
          // After revoking the token, dispatch logout action
          dispatch(logout());
      })
      .catch(error => {
          console.error('Error revoking token:', error);
          // Even if token revoke fails, still dispatch logout action
          dispatch(logout());
      });
};