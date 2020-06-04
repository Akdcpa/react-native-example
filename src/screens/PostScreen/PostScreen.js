import React, { Component } from 'react'
import { Text, View , ScrollView } from 'react-native'
import { SpanButton , Drawer , PostComponent } from '../../components/index'

import { getPosts , searchPosts} from '../../actions/PostAction/PostAction'
import { getAuthToken} from '../../actions/AuthAction/AuthAction'

import { Button } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
 

export default class PostScreen extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            posts:[],
        }
        // this.initialLoad=this.initialLoad.bind(this)
    }

    componentDidMount = () => {
        console.log("TOken" , getAuthToken())

        // setTimeout(() => {
        //     this.initialLoad()
        // }, 1000);  

        // getPosts().then((res)=>console.log("Res : " , res))
    };
    
    // initialLoad = () => {
    //     // this.showLoader()
    //     getPosts().then((res)=>{
    //         console.log("Response :" , res)
    //         if(res.status = "success") {
    //             console.log("posts", res.data[0])
    //             this.setState({
    //                 posts: res.data
    //             })
    //         }
    //     })
    //     .finally(() => {
    //         // this.hideLoader()
    //     })
    // }

    onClick = () =>{

        getPosts().then((res)=>console.log("Res : " , res))
        getPosts().then((res)=>{
            if(res.status = "success") {
                this.setState({
                    posts: res.data
                })
            }
        })
    }

    render() {
        return (
            <ScrollView>
               <TouchableOpacity onClick={this.onClick} ><Text  >Click</Text></TouchableOpacity> 
                 {this.state.posts.length > 0 && this.state.posts.map((items, index) => { 
                        return (
                                <View>
                                    <PostComponent
                                        // name={res.users.name}
                                        // branchId={items.branch_id}
                                        phone={res.users.email}
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
                                        // postId="{items.id}"
                                        // likes="{items.likes}"
                                        // dislikes="{items.dislikes}"
                                        // type="{items.type}"
                                        // logo="{items.url} "
                                        // users="{items.users}"
                                        // message="{items.message}"
                                        // amount="{items.maximum_order_value}"
                                        // onClick="{this.selecteBranch}"
                                        // comments="{items.comments}"
                                    /> 
                                </View> )
                            })
                        } 
            </ScrollView>
        )
    }
}
