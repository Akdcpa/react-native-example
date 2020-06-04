import React, { Component } from 'react'
import {
    Text,
    View,
    Alert
} from 'react-native'
import {
    TextInput,
    Button
} from 'react-native-paper'
import {
    TouchableOpacity
} from 'react-native-gesture-handler'
import {
    login,
    setAuthToken,
    getAuthToken
} from '../../../actions/AuthAction/AuthAction'

import {
    showWarningMessage,
    showSuccessMessage
} from './../../../utilities/NotificationUtilities/NotificationUtilities';

export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
        }
    }

    onLogin = () => {
        if (this.state.email.trim() != "" &&
            this.state.password.trim() != "") {
            login(this.state.email, this.state.password)
                .then((res) => {
                    if (res) {
                        if (res.status === "success") {
                            showSuccessMessage(res.message)
                            this.props.navigation.navigate('Home')
                            setAuthToken(res.data.access_token);
                            Alert.alert("Login Success")
                        }
                    }
                })
                .catch((err) => {

                })
        } else {
            showWarningMessage("Please, fill all the details")
        }
    }

    render() {
        return (
            <View style={styles.root} >
                <TextInput label="Email"
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                    style={styles.textinput}
                />

                <TextInput label="Password"
                    value={this.state.password}
                    onChangeText={text => this.setState({ password: text })}
                    style={styles.textinput}
                />

                <Button style={styles.button}
                    mode="contained"
                    onPress={this.onLogin}>Login</Button>

                <View style={styles.account} >
                    <Text>Don't have account?</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} >
                        <Text>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = {
    root: {
        flex: 1,
        backgroundColor: '#686868',
        justifyContent: 'center',
    },
    button: {
        margin: 10,
    },
    account: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    textinput: {
        margin: 10,
    },
}