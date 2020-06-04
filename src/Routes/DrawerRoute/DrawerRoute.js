 

import React from 'react';
import { 
  StyleSheet,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {Register , Login , PostScreen} from '../../screens/index'
 

const Drawer = createDrawerNavigator();

class DrawerRoute extends React.Component{
  render(){
    return( 
        // <NavigationContainer>
          <Drawer.Navigator initialRouteName="PostScreen" >
            <Drawer.Screen  name="PostScreen"
                            component={PostScreen}
                            options={{
                              // headerLeft:()=><SpanButton/>,
                              headerTitleAlign:'center'
                            }} />
          </Drawer.Navigator>
        // </NavigationContainer> 
    )
  }
}


export default DrawerRoute;
