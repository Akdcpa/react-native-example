import React, { Component } from 'react'
import { View , Image , StyleSheet  } from 'react-native'

// import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { IMAGE_BASE } from '../../configs/Configs'

import VideoComponent from './VideoComponent'

import like from '../../asserts/images/like.png'
import dislike from '../../asserts/images/dislike.png'
import share from '../../asserts/images/share.png'
import comment from '../../asserts/images/comment.png'
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Card, 
         CardItem, 
         Thumbnail, 
         Text, 
         Button, 
         Icon,
         Left, 
         Body, 
         Right 
} from 'native-base';
 
export default class PostComponent extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            count: 0,
            likecolor: '',
            dislikecolor: '',
            likecount: 0,
            dislikecount: 0,
            commentcount: this.props.comments.length,
            open: false,
            comments: this.props.comments,
            comment: '',
            sendShow: false
        }
    }
    

    componentDidMount = () => {
        this.initialLoad()
      };

    initialLoad = () => {
        this.setState({
            likecount: this.props.likes,
            dislikecount: this.props.dislikes,
            comments: this.props.comments,
            commentcount: this.props.comments.length,

        })
    }

    onClick = () => {
        this.props.onClick(this.props.branchId)
    }
    handleClick = () => {
        this.loadComments()
        this.setState({ open: true });
    }
    handleClose = () => {
        this.loadComments()
        this.setState({ open: false });

    };
    handleChange = (event) => {
        this.setState({ 
            [event.target.name]: event.target.value 
        });
    };
    handeleCommentType = () => {
        this.setState({
            sendShow: true
        })
    }

    likes = () => {
        let likecount = (+this.state.likecount) + 1;
        this.setState({
            likecolor: '#0067f3',
            likecount
        })

        likes(this.props.postId)
    }

    dislikes = () => {
        let dislikecount = (+this.state.dislikecount) + 1;
        this.setState({
            dislikecolor: '#0067f3',
            dislikecount
        })
        dislikes(this.props.postId)
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
            <View>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{uri:`${IMAGE_BASE}${this.props.logo}`}} />
                            <Body>
                            <Text>{this.props.users.name}</Text>
                            <Text note>@{this.props.users.email}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Text> {this.props.message} </Text>
                    </CardItem>
                    <CardItem cardBody>
                        {
                            this.props.type === 'IMAGE' &&
                                    <Image source={{uri:`${IMAGE_BASE}${this.props.logo}`}} style={{height: 300, width: null, flex: 1}}/>
                        }
                        {
                            this.props.type === 'VIDEO' && 
                            <VideoComponent link = {`${IMAGE_BASE}${this.props.logo}`} />
                        }
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Button transparent>
                            <Icon active name="thumbs-up" />
                            <Text> {this.state.likecount} </Text>
                            </Button>
                        </Left>
                        <Body>
                            <Button transparent>
                            <Icon active name="chatbubbles" />
                            <Text> {this.state.commentcount} </Text>
                            </Button>
                        </Body>
                        <Right>
                            <Text>11h ago</Text>
                        </Right>
                    </CardItem>
                </Card> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
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
      }
  });