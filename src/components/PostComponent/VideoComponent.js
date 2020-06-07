/*Example of React Native Video*/
import React, { Component } from 'react';
//Import React
import { Platform, StyleSheet, Text, View } from 'react-native';
//Import Basic React Native Component
import Video from 'react-native-video';
//Import React Native Video to play video
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
//Media Controls to control Play/Pause/Seek and full screen

import {
    TouchableWithoutFeedback
} from 'react-native-gesture-handler'

class VideoComponent extends Component {
  videoPlayer;

  constructor(props) {
    super(props);
    this.state = {
      // currentTime: 0,
      // duration: 0,
      // isFullScreen: false,
      // isLoading: true,
      // paused: false,
      // playerState: PLAYER_STATES.PLAYING,
      // screenType: 'content',
      paused:false,
      repeat:true,
      volume:1,
      rate:2,
      pausedText:'Play',
      muted:false,
      duration:0.0,
      currentTime:0.0
    };
  }

  onLoad = (data) =>{
    this.setState({duration:data.duration})
}

onPress = () =>{
    this.setState({currentTime:data.currentTime})
}

onEnd = () => {
    this.setState({ pausedText:"Play" , paused:true})
    this.video.seek(0)
}

  render() {
    return (
      <View style={{height:300}} >
      <TouchableWithoutFeedback 
          onPress={()=>this.setState({paused:!this.state.paused})}
       >
           <Video
              source={require('../../asserts/Videos/sample.mp4')}
              ref={(ref:Video) => {this.video=ref}}
              rate={1.0}
              volume={1.0}
              muted={false}
              resizeMode={"contain"}
              repeat={this.state.repeat}
              style={styles.video}
              paused={this.state.paused}
              muted={this.state.muted}
              onLoad={this.onLoad}
              onProgress={this.onProgress}
              onEnd={this.onEnd}
              
          />

      </TouchableWithoutFeedback>
      
  </View>
    );
  }
}
const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height:300
  },
  icons:{
      width:30,
      height:30, 
  },
  cardaction:{
      display:'flex',
      justifyContent:'space-between'
  },
  container: {
      flex: 1,
      justifyContent: 'center'
    },
    video: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      height:300
    },
    cardbody:{
      height: 300,
       width: null, 
       flex: 1
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5, 
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
});
export default VideoComponent;