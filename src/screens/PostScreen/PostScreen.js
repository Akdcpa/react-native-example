import React, { Component } from 'react'
import {  
        View , 
        ScrollView , 
        StyleSheet , 
        Image
  } from 'react-native'
import {  
        PostComponent , 
        Loader
  } from '../../components/index'

import { 
        getPosts , 
        searchPosts
  } from '../../actions/PostAction/PostAction'
 
import { FloatingAction } from "react-native-floating-action";

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
            isLoading: false
        }
        this.initialLoad=this.initialLoad.bind(this)
        func:this.props.navigation.openDrawer();
    }

    componentDidMount = async () => { 
        setTimeout(() => {1
            this.initialLoad()
        }, 1000);  
    };
    
    initialLoad = () => {
        this.showLoader()
        getPosts().then((res)=>{ 
            if(res.status = "success") { 
                this.setState({
                    posts: res.data
                })
            }
        })
        .finally(() => {
            this.hideLoader()
        })
    }

    showLoader = () => {
      this.setState({
          isLoading: true
      })
    }

    hideLoader = () => {
        this.setState({
            isLoading: false
        })
    }

 
    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
      };

    render() {

        const FabComponent = props=>{
            const navigation = useNavigation();
            return(
                <FloatingAction
                    actions={actions}
                    onPressItem={name => { 
                            navigation.navigate('PickFile' , {type:name}) 
                    }} 
                /> 
            )

        }

        return (
            <View>
                <ScrollView> 
                    {   this.state.isLoading &&
                        <Loader visible={this.state.isLoading} />
                    }
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
                { !this.state.isLoading &&
                  <FabComponent/>
                }
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