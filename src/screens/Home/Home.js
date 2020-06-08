import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import PostScreen from './../PostScreen/PostScreen'
import PickFile from '../PickFile/PickFile'
import AuthRoute from '../../Routes/AuthRoute/AuthRoute'
const Drawer = createDrawerNavigator();

class DrawerRoute extends React.Component {
    render() {
        return (
        <Drawer.Navigator  initialRouteName="PostScreen" >
                <Drawer.Screen 
                    name="PostScreen"
                    component={PostScreen}
                    options={{
                        headerTitleAlign: 'center'
                    }} />
                <Drawer.Screen 
                    name="PickFile"
                    component={PickFile}
                    options={{
                        headerTitleAlign: 'center'
                    }} />
            </Drawer.Navigator>
        )
    }
}


export default DrawerRoute;
