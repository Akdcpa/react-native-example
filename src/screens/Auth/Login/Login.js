import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {TextInput } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { login } from '../../../actions/AuthAction/AuthAction'

export default class Login extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             email:'',
             password:'',
        }
    }

    onLogin = () =>{
        login(this.state.email , this.state.password).then((res)=>{
            Alert.alert(res)
            console.log(res)
        }).catch((err)=>console.log(err))
    }
    
    render() {
        return (
            <View style={styles.root} >
                <TextInput  label="Email" 
                            value={this.state.email} 
                            onChangeText={text=>this.setState({email:text})}
                            ></TextInput>
                <TextInput  label="Password" 
                            value={this.state.password} 
                            onChangeText={text=>this.setState({password:text})} ></TextInput>
                <Button style={styles.button} 
                        mode="contained" 
                        onPress={this.onLogin}>
                  Login
                </Button>
                <View style={styles.account} >
                    <Text>Don't have account?</Text>
                    <TouchableOpacity>
                        <Text>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = {
    root:{
        flex:1,
        backgroundColor:'#686868',
        justifyContent: 'center',
    },
    button:{
        margin: 10,
    },
    account:{
        flexDirection:'row',
    }
}