import React, { Component } from 'react'
import { Text, View , StyleSheet } from 'react-native'

import {
    Avatar
} from 'react-native-elements'

export default class Comment extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
                comment:'',
        }
        this.loadComments = this.loadComments.bind(this)
    }

    componentDidMount(){
        this.loadComments()
    }

    addComment = () => {
        addComment(this.props.postId, this.state.comment).then((res) => {
            this.loadComments()
        })
    }

    loadComments = () => {
        loadComments(this.props.postId).then((res) => {
            if(res.status == "success") {
                this.setState({
                    comments: res.data,
                    comment: ""
                })
            }
        })
    }
    
    render() {
        return (
            <View style={styles.root} >
                <View>
                {this.state.comments.map((val, ind) => ( 
                    <View> 
                        <Avatar
                            size="small"
                            rounded
                            title={val.user.name}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}
                            />
                        <Typography>{val.comment}</Typography> 
                </View>
                    
                        ))
                        }  
                      
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    }
})
