import React, { Component } from 'react'
import { Text , View , StyleSheet ,Button } from 'react-native'
import { 
    FAB,
    Provider,
    Portal
 } from 'react-native-paper'
 
import { FloatingAction } from "react-native-floating-action";

import ModalTester from './ModalTester'

 const actions = [
    {
      text: "PostFile",
      icon: require("../../asserts/images/edit-image.png"),
      name:"post_file",
      position: 2,
      buttonSize:45,
      color:'#5400b9'
    },
    {
      text: "PostComment",
      icon: require("../../asserts/images/pencil.png"),
      name: "post_comment",
      position: 1,
      color:'#3aa600'
    },
   
  ];

export default class FabAction extends Component {

    constructor(props) {    
        super(props)    
    
        this.state = {
            //  active:false,
            //  open:false,
             isModalVisible:false
        }
    } 
 
    toggleModal = () => {
        return(
            <View>
                <ModalTester/>
            </View>
        )
      };


    render() {
        const {open} = this.state;
        return (  
                 <FloatingAction
                actions={actions}
                onPressItem={name => {
                    if(name==="post_file"){
                        this.toggleModal
                    }
                    console.log(`selected button: ${name}`);
                }} 
                />
        )
    }
}


const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      color:'blue',
      backgroundColor:'blue',
      zIndex: 100,
    },
  })