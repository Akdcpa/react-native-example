import React, { Component } from 'react'
import { Text, View ,Alert} from 'react-native'
import {TextInput,Button } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { login , setAuthToken , getAuthToken } from '../../../actions/AuthAction/AuthAction'
import AsyncStorage from '@react-native-community/async-storage'

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
            if(res.status === "success"){
                this.props.navigation.navigate('DrawerRoute')
                setAuthToken(res.data.access_token);
                Alert.alert("Login Success")
            }
            console.log("Login response : " , res.data.access_token  )
        }).catch((err)=>console.log(err)) 

        console.log("AS7n",getAuthToken())
    }
    
    render() {
        return ( 
            <View style={styles.root} >
                <TextInput  label="Email" 
                            value={this.state.email} 
                            onChangeText={text=>this.setState({email:text})} 
                            style={styles.textinput}
                            ></TextInput>

                <TextInput  label="Password" 
                            value={this.state.password} 
                            onChangeText={text=>this.setState({password:text})}
                            style={styles.textinput}
                            ></TextInput>

                <Button style={styles.button} 
                        mode="contained" 
                        onPress={this.onLogin}>Login</Button>

                <View style={styles.account} >
                    <Text>Don't have account?</Text>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')} >
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
        justifyContent: 'center',
    },
    textinput:{
        margin: 10,
    },
}