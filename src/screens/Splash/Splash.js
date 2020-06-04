import React, { Component } from 'react';
import { 
    View, 
    Text 
} from 'react-native';
import {
    getAuthToken
} from './../../actions/AuthAction/AuthAction';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    this.initialLoad()
  };

  initialLoad = () => {
      setTimeout(async() => {
          let token = await getAuthToken()
          if(token != null) {
              this.props.navigation.navigate("Home")
          } else {
            this.props.navigation.navigate("Login")
          }
      }, 500);
  }  

  render() {
    return (
      <View>
        <Text> Welcome to Post Book </Text>
      </View>
    );
  }
}

export default Splash;
