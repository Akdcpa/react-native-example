import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Drawer as SideDrawer } from 'react-native-paper'
import SpanButton from '../SpanButton/SpanButton'
export default class Drawer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             active:'first',
             show:'none'
        }
    }

    handleCilck = () =>{
        this.setState({show:'flex'})
    }
    
    render() {
        return ( 
            <View>
                <SpanButton click={this.handleCilck} ></SpanButton>
                <SideDrawer.Section  title="SharePost"  >
                    <SideDrawer.Item 
                         label="First Item"
                         active={this.state.active === 'first'}
                         onPress={() =>this.setState({active:'first'})}
                     /> 
                     <SideDrawer.Item 
                         label="First Item"
                        
                         active={this.state.active === 'second'}
                         onPress={() =>  this.setState({active:'second'})}
                     /> 
                </SideDrawer.Section>
            </View> 
        )
    }
}

const styles = {
    sidedrawer:{
        height: '100%',
        background:'white',
        // box-shadow: '1px 0px 7px rgba(0, 0, 0, 0.5)',
        position: 'fixed',
        top:0,
        left: 0,
        width: '70%',
        maxWidth:400, 
        // transform: translateX(-100%), 
        // transition: transform 0.3s ease-out, 
        }
}

 