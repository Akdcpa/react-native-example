import React, { Component } from 'react'
import { Text, View , ScrollView } from 'react-native'
import { SpanButton , Drawer , PostComponent ,FabAction} from '../../components/index'

import { getPosts , searchPosts} from '../../actions/PostAction/PostAction'
import { getAuthToken} from '../../actions/AuthAction/AuthAction'

import { Button } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
 
import AsyncStorage from '@react-native-community/async-storage';
 
import Modal from 'react-native-modal';

import { FloatingAction } from "react-native-floating-action";
 

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
            isModalVisible:false
        }
        this.initialLoad=this.initialLoad.bind(this)
    }

    componentDidMount = async () => {
        console.log("Token" ,await AsyncStorage.getItem('Auth_Token'))

        setTimeout(() => {
            this.initialLoad()
        }, 1000);  

        getPosts().then((res)=>console.log("Res : " , res))
    };
    
    initialLoad = () => {
        // this.showLoader()
        getPosts().then((res)=>{
            console.log("Response :" , res)
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

    render() {
        return (
            <View>
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{flex: 1}}>
                        <Text>Hello!</Text>
                        <Button title="Hide modal" onPress={this.toggleModal} />
                    </View>
                </Modal>
                <ScrollView> 
                    {this.state.posts.length > 0 && this.state.posts.map((items, index) => { 
                            return (
                                    <View>
                                        <PostComponent
                                            // name={res.users.name}
                                            // branchId={items.branch_id}
                                            // phone={res.users.email}
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
                    <FloatingAction
                    actions={actions}
                    onPressItem={name => {
                        if(name==="post_file"){
                            this.toggleModal
                        }
                        console.log(`selected button: ${name}`);
                    }} 
                    />
            </View>
        )
    }
}
