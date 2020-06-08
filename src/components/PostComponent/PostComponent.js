import React , { Component} from 'react'
import { View , Image , StyleSheet ,TextInput } from 'react-native'

// import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { IMAGE_BASE } from '../../configs/Configs'
 
import Close from '../../asserts/images/close.png'
import like from '../../asserts/images/like.png'
import dislike from '../../asserts/images/dislike.png'
import share from '../../asserts/images/share.png'
import comment from '../../asserts/images/comment.png'
import { TouchableOpacity , TouchableWithoutFeedback , TouchableHighlight, ScrollView} from 'react-native-gesture-handler';
import Video from 'react-native-video'

import {
    Avatar
} from 'react-native-elements'

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
import VideoLoader from './VideoLoader'

import {
      addComment,
      likes,
      dislikes,
      loadComments,

} from '../../actions/PostAction/PostAction'
// import VideoPlayer from 'react-native-video-player';
 import {
        Button as PaperButton
 } from 'react-native-paper'
 
 import Modal from 'react-native-modal'
export default class PostComponent extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            count: 0,
            likecolor: 'black',
            dislikecolor: 'black',
            likecount: 0,
            dislikecount: 0,
            commentcount: this.props.comments.length,
            open: false,
            comments: this.props.comments,
            comment: '',
            sendShow: false,
            video: { width: undefined, height: undefined,  undefined },
            thumbnailUrl: undefined,
            videoUrl: undefined,
            modalVisible:false,
            paused:true,
            repeat:true,
            volume:1,
            rate:2,
            pausedText:'Play',
            muted:false,
            duration:0.0,
            currentTime:0.0,
            isModalVisible:false
        }

        this.loadComments = this.loadComments.bind(this);
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
            likecolor: 'blue',
            likecount
        })

        likes(this.props.postId)
    }

    dislikes = () => {
        let dislikecount = (+this.state.dislikecount) + 1;
        this.setState({
            dislikecolor: 'blue',
            dislikecount
        })
        dislikes(this.props.postId)
    }

    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
        // this.loadComments()
        console.log("State :" , this.props.comments)
      };

    componentDidMount(){
        // this.loadComments()
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
 
    onLoad = (data) =>{
        this.setState({duration:data.duration})
    }

    onPress = () =>{
        this.setState({currentTime:data.currentTime})
    }
    
    onEnd = () => {
        this.setState({ pausedText:"Play" , paused:true})
        this.video.seek(0)
    }

    render() {
        return (
            <View>
                <Card>
                    <CardItem>
                        <Left>
                            {
                                this.props.type==='IMAGE' &&
                                <Thumbnail source={{uri:`${IMAGE_BASE}${this.props.logo}`}} />
                            }
                            <Body>
                            <Text>{this.props.users.name}</Text>
                            <Text note>@{this.props.users.email}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Text> {this.props.message} </Text>
                    </CardItem>
                    <CardItem cardBody style={styles.cardbody} >
                        {
                            this.props.type === 'IMAGE' &&
                                    <Image source={{uri:`${IMAGE_BASE}${this.props.logo}`}} style={styles.video} />
                        }
                        {
                            this.props.type === 'VIDEO' &&
                                // <View style={{height:300}} >
                                    <TouchableWithoutFeedback 
                                        onPress={()=>this.setState({paused:!this.state.paused})}
                                     >
                                         <Video
                                            source={{uri:`${IMAGE_BASE}${this.props.logo}`}}
                                            ref={(ref:Video) => {this.video=ref}}
                                            rate={1.0}
                                            volume={1.0}
                                            muted={false}
                                            resizeMode={"cover"}
                                            repeat={false}
                                            style={styles.video}
                                            paused={this.state.paused}
                                            muted={this.state.muted}
                                            onLoad={this.onLoad}
                                            onProgress={this.onProgress}
                                            onEnd={this.onEnd}
                                            
                                        />

                                    </TouchableWithoutFeedback>
                                    
                                // </View>
                                    

                        }
                    
                    </CardItem>
                    <CardItem>
                        <Left>
                             <Button transparent onPress={this.likes} > 
                                <Icon active style={{color:this.state.likecolor}} name="thumbs-up" />
                                <Text> {this.state.likecount} </Text>   
                             </Button> 
                        </Left>
                        <Body>
                            <Button transparent  onPress={this.dislikes}  >
                            <Icon active style={{color:this.state.dislikecolor}} name="thumbs-down" />
                            <Text> {this.state.dislikecount} </Text>
                            </Button>
                        </Body>
                        <Body>
                            <Button transparent onPress={this.toggleModal  } >
                            <Icon active name="chatbubbles" />
                            <Text> {this.state.commentcount} </Text>
                            </Button>
                        </Body>
                        <Right>
                            <Text>11h ago</Text>
                        </Right>
                    </CardItem> 
                </Card> 
                    {/* <Button title="Show modal" onPress={this.toggleModal} /> */}
                <View style={{flex:1}} >
                    <Modal style={styles.modal} isVisible={this.state.isModalVisible}> 

                            <View style={styles.modalhead} > 
                                <Text style={styles.title} >Comments</Text>
                                <Button transparent onPress={this.toggleModal  } >
                                    <Icon style={{fontSize:30}} active name="close" /> 
                                </Button>
                            </View> 
                            <ScrollView style={styles.scroll}>  
                                {this.state.comments.map((val, ind) => ( 
                                    <View style={styles.commentuser} > 
                                        <Avatar
                                            size="small"
                                            rounded
                                            title={val.user.name}
                                            onPress={() => console.log("Works!")}
                                            activeOpacity={0.7}
                                            />
                                        <Text>{val.comment}</Text> 
                                    </View>
                                    ))
                                }  
                            <View style={styles.commentpost} >
                                <Button transparent onPress={this.toggleModal  } >
                                        <Icon style={{fontSize:20}} active name="camera" /> 
                                </Button>
                                <TextInput placeholder="Comment" style={{width:'100%'}}></TextInput>
                                <Button transparent onPress={this.toggleModal  } >
                                        <Icon style={{fontSize:20}} active name="send" /> 
                                </Button>
                            </View>
                            </ScrollView> 
                    </Modal>
                </View>
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
      height:300
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
      },
      video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height:300
      },
      cardbody:{
        height: 300,
         width: null, 
         flex: 1
      },
      modalhead:{
          justifyContent:'space-between',
          flexDirection:'row',
          alignItems:'center'
      },
      modal:{
          backgroundColor:'white'
    },
    title:{
        fontWeight:"bold",
        fontSize:15,
        fontFamily:'sans-serif',
        marginLeft:3
    },
    scroll:{
        flex: 1, 
        marginLeft:5,
    },
    commentpost:{
        flexDirection:'row',
        justifyContent:"space-between",
        marginTop:10
    },
    commentuser:{
        marginLeft:5
    }

  });