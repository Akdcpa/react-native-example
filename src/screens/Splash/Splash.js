import React, { Component } from 'react';
import { 
    View, 
    Text ,
    StyleSheet
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

  initialLoad =async () => {
    let token = await getAuthToken()
      setTimeout(async() => {
          // let token = await getAuthToken()
          if(token != null) {
              this.props.navigation.navigate("Home")
          } else {
            this.props.navigation.navigate("Login")
          }
      }, 500);
  }  

  render() {
    return (
      <View style={styles.splash} >
        <Text style={styles.text} > Welcome to Post Book </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({ 
  splash:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize:25,
    fontWeight:"bold",
    color:"grey"
  }
});

export default Splash;
