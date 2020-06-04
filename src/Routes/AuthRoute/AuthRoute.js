 

import React from 'react';
import { 
  StyleSheet,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {Register , Login, } from '../../screens/index' 
import DrawerRoute from '../DrawerRoute/DrawerRoute'
const Stack = createStackNavigator();

class AuthRoute extends React.Component{
  render(){
    return( 
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" >
            <Stack.Screen  name="Register" 
                            component={Register} 
                            options={{
                              headerLeft:null,
                              headerTitleAlign:'center'
                            }} />  
            <Stack.Screen  name="Login" 
                            component={Login} 
                            options={{
                              headerLeft:null,
                              headerTitleAlign:'center'
                            }} />
            <Stack.Screen name="DrawerRoute" 
                          component={DrawerRoute} 
                          />
          </Stack.Navigator>
        </NavigationContainer> 
    )
  }
}
 
export default AuthRoute;
