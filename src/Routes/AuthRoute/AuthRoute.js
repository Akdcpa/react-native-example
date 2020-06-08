

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
  Button, 
  Icon,
} from 'native-base'; 
const Stack = createStackNavigator();

import {
  func
} from '../../screens/PostScreen/PostScreen'

export class Menu extends React.Component {
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };
  render(){
    return(
      <Button transparent onPress={this.toggleDrawer.bind(this)}  >
        <Icon style={{fontSize:35}} active name="md-menu" /> 
      </Button>
    )
  }
}

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

// export const MenuBar = props =>{ 
//   return(
//     <View>
//       <Button transparent onPress={()=>t}  >
//           <Icon style={{fontSize:35}} active name="md-menu" /> 
//       </Button>
//     </View>
//   )
// }
export default AuthRoute;
