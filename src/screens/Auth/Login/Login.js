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
    showSuccessMessage,
    
} from './../../../utilities/NotificationUtilities/NotificationUtilities';

import Loader from "../../../components/Loader/Loader"
export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            isLoading:false
        }
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

    onLogin = () => {

        if (this.state.email.trim() != "" &&
            this.state.password.trim() != "") {
            this.setState({
                isLoading: true
            })
            this.showLoader();
            login(this.state.email, this.state.password)
                .then((res) => {
                    if (res) {
                        if (res.status === "success") {
                            showSuccessMessage(res.message)
                            this.props.navigation.navigate('Home')
                            setAuthToken(res.data.access_token);
                            this.setState({
                                email:'',
                                password:''
                            })
                        }
                    }
                })
                .catch((err) => {

                })
                .finally(()=>{
                    this.hideLoader()
                })
        } else {
            showWarningMessage("Please, fill all the details")
        }
    }

    render() {
        return (
            <View style={styles.root} >
                {
                    !this.state.isLoading &&
                    <View>
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
                        <Text style={{color:'white'}} >Don't have account?</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} >
                            <Text style={{color:'white'}} >Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                }
                {
                    this.state.isLoading &&
                    <Loader visible={this.state.isLoading} />
                }
                
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