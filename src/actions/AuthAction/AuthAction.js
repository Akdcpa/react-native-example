import {  
    AUTH_BASE
} from './../../configs/Configs';
import {
    ACCESS_TOKEN
} from './../../constants/Constants';

import {
    handleResponse,
    handleCatch,
    
} from '../../utilities/AuthActionUtilities/AuthActionUtilities';
// import {AsyncStorage} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage';

export const register = async (name, email, password) => {
    return fetch(`${AUTH_BASE}auth/register`, {
        headers:{
            "Content-Type": "application/json",
        },
        method: 'POST',
        body:JSON.stringify({
            name,
            email,
            password
        }),
    })
    .then((res) => {
        return handleResponse(res) ;
    })
    .catch((e) => {
        return handleCatch(e) ;
    })
}

export const login = async (email, password) => {
    return fetch(`${AUTH_BASE}auth/login`, {
        headers:{
            "Accept":"application/json", 
            "Content-Type": "application/json",
        },
        method: 'POST',
        body:JSON.stringify({
            email,
            password
        })
    })
    .then((res) => { 
        return handleResponse(res) ;
    })
    .catch((e) => {
        return handleCatch(e) ;
    })
}

export const logout = async () => {
    let token = getAuthToken()
    return fetch(`${AUTH_BASE}logout`, {
        headers:{
            'Authorization': `Bearer ${token}`,
        },
        method: 'GET',
    })
    .then((res) => { 
        return handleResponse(res) ;
    })
    .catch((e) => {
        return handleCatch(e) ;
    })
}

export const setAuthToken = (token) => {
    AsyncStorage.setItem(ACCESS_TOKEN, token)
}

export const getAuthToken = () => {
    return AsyncStorage.getItem(ACCESS_TOKEN)
}
  

export const onSignIn = () => AsyncStorage.setItem(ACCESS_TOKEN, "true");

export const onSignOut = () => AsyncStorage.removeItem(ACCESS_TOKEN);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(ACCESS_TOKEN)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};