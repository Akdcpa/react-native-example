import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import PostScreen from './../PostScreen/PostScreen'


const Drawer = createDrawerNavigator();

class DrawerRoute extends React.Component {
    render() {
        return (
            <Drawer.Navigator initialRouteName="PostScreen" >
                <Drawer.Screen 
                    name="PostScreen"
                    component={PostScreen}
                    options={{
                        headerTitleAlign: 'center'
                    }} />
            </Drawer.Navigator>
        )
    }
}


export default DrawerRoute;
