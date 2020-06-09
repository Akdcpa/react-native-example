import React, 
    { Component } from 'react'
import { 
        Text, 
        View, 
        Alert 
} from 'react-native'

import {
    showWarningMessage,
    showSuccessMessage,
    showErrorMessage
} from './../../../utilities/NotificationUtilities/NotificationUtilities';

import {
    TextInput, 
    Button
 } from 'react-native-paper'

import { 
    TouchableOpacity  
} from 'react-native-gesture-handler'

import { 
    register
} from '../../../actions/AuthAction/AuthAction'

export default class Register extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             email:'',
             password:'',
             username:'',
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

    onRegister = () =>{
        if (this.state.email.trim() != "" &&
            this.state.password.trim() != "" &&
            this.state.username.trim() != "") {
                this.showLoader()
                register(this.state.username , this.state.email , this.state.password).then((res)=>{
                    if(res.status==="success"){
                       this.props.navigation.navigate('Login') 
                       showSuccessMessage("Registration Success")
                       this.setState({
                        email:'',
                        password:'',
                        username:''
                       })
                    }  
                }).catch((err)=>{
                    showErrorMessage("Registration Error") 
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
                <TextInput  label="Username" 
                            value={this.state.username} 
                            onChangeText={text=>this.setState({username:text})}
                            style={styles.textinput}
                             ></TextInput>
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
                        onPress={this.onRegister}>
                  Register
                </Button>
                <View style={styles.account} >
                    <Text style={{color:'white'}} >Aleady have account?</Text>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')} >
                        <Text style={{color:'white'}} >Login</Text>
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
    textinput:{
        margin: 10,
    },
    button:{
        margin: 10,
    },
    account:{
        flexDirection:'row', 
        justifyContent:'center'
    }
}