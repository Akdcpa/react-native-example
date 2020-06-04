import {  
    AUTH_BASE
} from './../../configs/Configs';
import {
    ACCESS_TOKEN
} from './../../constants/Constants';

import {
    handleResponse,
    handleCatch,
    
} from '../../utilities/FetchActionUtilities/FetchActionUtilities';
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
  
export const setAuthToken = async (user_auth_token) => {
    try {
      await AsyncStorage.setItem('Auth_Token', user_auth_token )
    } catch (e) {
      // saving error
    }
  }
export const getAuthToken = async () => {
    try {
      const value = await AsyncStorage.getItem('Auth_Token')
      if(value !== null) {
        return value;
      }
    } catch(e) {

    } 
}

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('Auth_Token')
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