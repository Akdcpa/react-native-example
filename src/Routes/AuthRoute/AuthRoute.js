

import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {
  Register,
  Login,
  Home,
  Splash
} from '../../screens/index'
const Stack = createStackNavigator();

class AuthRoute extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" >
        <Stack.Screen
            name="Splash"
            component={Splash}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerLeft: null,
              headerTitleAlign: 'center'
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerLeft: null,
              headerTitleAlign: 'center'
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerLeft: null,
              headerTitleAlign: 'center'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default AuthRoute;
