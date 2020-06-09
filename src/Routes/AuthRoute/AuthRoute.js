import React from 'react';
import {
  StyleSheet,View
} from 'react-native';

import { NavigationContainer ,
          useNavigation
} from '@react-navigation/native'

import { createStackNavigator} from '@react-navigation/stack'

import {
  Register,
  Login,
  Home,
  Splash,
  MenuItem
} from '../../screens/index'

import {
    Menu
} from '../../screens/Home/Home'

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
              headerTitleAlign: 'center',
              headerLeft:()=> <Menu/>
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
export default AuthRoute;
