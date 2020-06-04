
import React from 'react';

import { AuthRoute,DrawerRoute } from './src/Routes/index'
 
import { isSignedIn , onSignOut } from './src/actions/AuthAction/AuthAction'

class App extends React.Component{

  constructor(props) {
    super(props)
  
    this.state = {
        signin:false,
        checkSignin:false,
    }
  }

  componentDidMount(){ 
    isSignedIn()
      .then((res)=>this.setState({signin:res , checkSignin:true}))
      .catch((err)=>alert("Error"))
  }
  
  render(){ 
    
        if(!this.state.checkSignin){
          return null
        }
        if(this.state.signin){
          return <DrawerRoute/>
        }
        else{
          return <AuthRoute/>
        } 
  }
}

export default App;
