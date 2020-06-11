import React, { Component } from 'react'
import { Text, View , StyleSheet} from 'react-native'
import Video from 'react-native-video'
import {
    Card
} from 'native-base'
export default class VideoExample extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            paused:false,
            muted:false,
            
        }
    }
    
    render() {
        return (
            <View style={styles.root} >
                <Card style={styles.card} >
                    <Video
                        source={{uri:"https://www.w3schools.com/html/mov_bbb.mp4"}}
                        ref={(ref:Video) => {this.video=ref}}
                        rate={1.0}
                        volume={1.0}
                        muted={false}
                        resizeMode={"cover"}
                        repeat={false}
                        style={styles.video}
                        paused={this.state.paused}
                        muted={this.state.muted}
                        // onLoad={this.onLoad}
                        // onProgress={this.onProgress}
                        // onEnd={this.onEnd}
                    />
                </Card>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    root:{
        height:300
    },  
    imageStyle: {
        height: 300,
        width: "94%",
        borderRadius: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4
    },
    card:{
        height:300
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: 300
    },
});