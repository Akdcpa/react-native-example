import React, { Component } from 'react';
import { View ,Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class SpanButton extends Component {
    render() { 
        return (
            <TouchableOpacity style={styles.togglebutton} onClick={this.props.click} >
                <View style={styles.span} ></View>
                <View style={styles.span} ></View>
                <View style={styles.span} ></View>
                <Text  >Click</Text>
            </TouchableOpacity>
        );
    }
}
 
const styles = {
    span:{
        width:'100%',
        height:10,
        backgroundColor:'blue',
        marginTop:2
    },
    togglebutton:{
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        height:20,
        width:30,
        background:'transparent',
        border:'none',
        padding: 0,
        boxSizing:'border-box'
    }
}
export default SpanButton;