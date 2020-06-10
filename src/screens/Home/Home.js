import React from 'react';
import {
    StyleSheet, 
    View, 
    Alert,
    Text
} from 'react-native'

import {
    createDrawerNavigator,
    DrawerItem,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerContent
} from '@react-navigation/drawer'

import PostScreen from './../PostScreen/PostScreen'

import PickFile from '../PickFile/PickFile'

import AuthRoute from '../../Routes/AuthRoute/AuthRoute'

import {
    Button,
    Icon,
    Container,
    Header,
    Left,
    Right,
    Body
} from 'native-base'

import {
    logout,
    clearToken
} from '../../actions/AuthAction/AuthAction'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loader from '../../components/Loader/Loader'

import {
    showErrorMessage,
    showSuccessMessage
} from '../../utilities/NotificationUtilities/NotificationUtilities'
import Colors from './../../asserts/Colors';

class Logout extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false
        }
        this.logoutDialog = this.logoutDialog.bind(this)
    }
    showLoader = () => {
        this.setState({
            isLoading: true
        })
    }

    hideLoader = () => {
        this.setState({
            isLoading: false
        })
    }

    logoutDialog = () => {
        Alert.alert(
            'Log out',
            'Do you want to logout?',
            [
                {
                    text: 'Cancel', onPress: () => {
                        this.props.navigation.toggleDrawer();
                        return null
                    }
                },
                {
                    text: 'Confirm', onPress: () => {
                        this.props.navigation.toggleDrawer();
                        this.showLoader();
                        logout().then((res) => {
                            if (res.status === "success") {
                                this.props.navigation.navigate('Login')
                                showSuccessMessage("Logout Success")
                                clearToken();
                            }
                            else {
                                showErrorMessage("Can't Logout")
                            }
                        })
                            .finally(() => {
                                this.hideLoader();
                            })
                    }
                },
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
            <Container>
                <Header style={{backgroundColor: Colors.SECODARY}}>
                    <Left/>
                    <Body>
                        <Text style={{fontSize: 20}}>Post Book</Text>
                    </Body>
                </Header>
                <DrawerContentScrollView {...this.props}>
                    <DrawerItemList   {...this.props} />
                </DrawerContentScrollView>
                <Button
                    onPress={this.logoutDialog}
                    style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}
                >
                    <Icon style={{ fontSize: 35 }} active name="log-out" />
                    <Text style={{fontSize: 20, color: "#FFFFFF"}}>Logout</Text>
                </Button>
            </Container>

        )
    }
}

export class Menu extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <Button transparent onPress={() => { }}  >
                <Icon style={{ fontSize: 35 }} active name="md-menu" />
            </Button>
        )
    }
}
export class Posts extends React.Component {
    render() {
        return null
    }
}
export class Explore extends React.Component {
    render() {
        return null
    }
}
export class Profile extends React.Component {
    render() {
        return null
    }
}

const Drawer = createDrawerNavigator();

class DrawerRoute extends React.Component {
    render() {
        return (
            <Drawer.Navigator 
                drawerType="slide" 
                overlayColor="none" 
                initialRouteName="PostScreen" 
                sceneContainerStyle={{width: "70%"}}
                drawerContent={props => <Logout {...props} />} 
                >
                <Drawer.Screen
                    name="PostScreen"
                    component={PostScreen}
                    options={{
                        headerTitleAlign: 'center',
                        drawerIcon: () => <Icon style={styles.icon} name="home" />,
                        headerStyle: styles.head
                    }}

                />
                <Drawer.Screen
                    name="Explore"
                    component={Explore}
                    options={{
                        drawerIcon: () => <Icon style={styles.icon} name="bookmarks" />,
                    }}
                />
                <Drawer.Screen
                    name="Posts"
                    component={Posts}
                    options={{
                        drawerIcon: () => <Icon style={styles.icon} name="film" />,
                    }}
                />
                <Drawer.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        drawerIcon: () => <Icon style={styles.icon} name="person" />,
                    }}
                />
                <Drawer.Screen
                    name="Menu"
                    component={Menu}
                    options={{
                        drawerLabel: () => null
                    }}
                />
                <Drawer.Screen
                    name="PickFile"
                    component={PickFile}
                    options={{
                        headerTitleAlign: 'center',
                        drawerLabel: () => null,
                    }} />

            </Drawer.Navigator>
        )
    }
}


const styles = StyleSheet.create({

    icon: {
        color: 'blue',
        marginRight: 7
    },
    head: {
        bottom: 0,
        position: "absolute"
    },
    logout: {
        bottom: 0,
        position: "absolute"
    }

});

export default DrawerRoute;
