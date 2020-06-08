import React, { Component } from 'react'
import { Text, View , ScrollView , StyleSheet , Image} from 'react-native'
import { SpanButton , Drawer , PostComponent ,FabAction} from '../../components/index'

import { getPosts , searchPosts} from '../../actions/PostAction/PostAction'
import { getAuthToken} from '../../actions/AuthAction/AuthAction'

import { Button } from 'react-native-paper'

import {
    Button as BaseButton,
    Icon
} from 'native-base'
// import { TouchableOpacity } from 'react-native-gesture-handler'
 
import AsyncStorage from '@react-native-community/async-storage';
 
import Modal from 'react-native-modal';

import PickFile from '../PickFile/PickFile'

import { FloatingAction } from "react-native-floating-action";
import {
    TouchableOpacity
} from 'react-native-gesture-handler'
import ImagePicker from 'react-native-image-picker';
 
import { createPosts } from '../../actions/PostAction/PostAction'

import {
    useNavigation
} from '@react-navigation/native'
 
 
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



export default class PostScreen extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            posts:[],
            isModalVisible:false,
            ImageSource: null,

        }
        this.initialLoad=this.initialLoad.bind(this)

    }

    componentDidMount = async () => { 
        setTimeout(() => {
            this.initialLoad()
        }, 1000);  
    };
    
    initialLoad = () => {
        // this.showLoader()
        getPosts().then((res)=>{ 
            if(res.status = "success") {
                console.log("posts", res.data[0])
                this.setState({
                    posts: res.data
                })
            }
        })
        .finally(() => {
            // this.hideLoader()
        })
    }
 
    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
      };

      selectPhotoTapped() {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500, 
          storageOptions: {
            skipBackup: true
          }
        };

        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled photo picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            let source = { uri: response.uri };
            this.setState({

              ImageSource: source,
              type:'IMAGE'
            });
          }
        });
        console.log("Choosed Data : " , this.state.ImageSource)
      }

    render() {

        const FabComponent = props=>{
            const navigation = useNavigation();

            return(
                <FloatingAction
                    actions={actions}
                    onPressItem={name => {
                        // if(name==="post_file"){
                            // this.setState({isModalVisible:true})
                            navigation.navigate('PickFile' , {type:name})
                            console.log(`selected button: ${name}`);   
                        // }
                    }} 
                /> 
            )

        }

        return (
            <View>
                <ScrollView> 
                    {this.state.posts.length > 0 && this.state.posts.map((items, index) => { 
                            return (
                                    <View>
                                        <PostComponent 
                                            postId={items.id}
                                            likes={items.likes}
                                            dislikes={items.dislikes}
                                            type={items.type}
                                            logo={items.url}
                                            users={items.users}
                                            message={items.message}
                                            amount={items.maximum_order_value}
                                            onClick={this.selecteBranch}
                                            comments={items.comments}
                                        /> 
                                    </View> )
                                })
                            } 

                </ScrollView> 

                <FabComponent/>
            </View>
        )
    }
}

const styles = StyleSheet.create({ 
      modal:{
          backgroundColor:'white'
    }, 
    root:{
        flexGrow:1,
        justifyContent:'center'
    },
    container: {
        flex: 1
      },
    textinput:{
        width:'100%'
    }
  });