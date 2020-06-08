import React from 'react';
import {
    StyleSheet,View
} from 'react-native'
import {    createDrawerNavigator,
            DrawerItem
} from '@react-navigation/drawer'
import PostScreen from './../PostScreen/PostScreen'
import PickFile from '../PickFile/PickFile'
import AuthRoute from '../../Routes/AuthRoute/AuthRoute'
import {
    Button,
    Icon
} from 'native-base'
const Drawer = createDrawerNavigator();

import {
    logout
} from '../../actions/AuthAction/AuthAction'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Logout = props =>{

    const logOut = () =>{
        logout().then((res)=>{
            console.log("Response :" , res)
        })
    }
    return(
        <TouchableOpacity>
            <View style={styles.logout} >
                <DrawerItem 
                    onPress={logOut}
                    label="Logout"
                />
            </View>
        </TouchableOpacity>
    )
}

class DrawerRoute extends React.Component {
    render() {
        return (
        <Drawer.Navigator drawerType="slide" overlayColor="none" initialRouteName="PostScreen" drawerContent={props =><Logout {...props} />} >
                <Drawer.Screen 
                    name="PostScreen"
                    component={PostScreen}
                    options={{
                        headerTitleAlign: 'center',
                        drawerIcon:()=><Icon style={styles.icon} name="home" />,
                        headerStyle:styles.head
                    }}
                    
                    />
                <Drawer.Screen 
                    name="PickFile"
                    component={PickFile}
                    options={{
                        headerTitleAlign: 'center',
                        drawerLabel:()=>null,
                    }} />

                {/* <Drawer.Screen  
                    name="Logout"
                    component={Logout}
                    options={{
                        drawerIcon:()=><Icon style={styles.icon} name="log-out" />,
                    }}
                        /> */}
                
            </Drawer.Navigator>
        )
    }
}


const styles = StyleSheet.create({ 

  icon:{
      color:'blue',
  },
  head:{
      bottom:0, 
      position:"absolute"
  },
  logout:{
    bottom:0, 
    position:"absolute"
  }

});

export default DrawerRoute;
