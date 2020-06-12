import React, { Component } from 'react'
import {
    View,
    Image,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback
} from 'react-native'
import {
    IMAGE_BASE
} from '../../configs/Configs'

import {
    ScrollView
} from 'react-native-gesture-handler';
import Video from 'react-native-video'
import VideoPlayer from 'react-native-video-player';

import {
    Avatar
} from 'react-native-elements'

import {
    Card,
    CardItem,
    Thumbnail,
    Text,
    Button,
    Icon,
    Left,
    Body,
    Right,
    Container,
    Spinner
} from 'native-base';

import {
    addComment,
    likes,
    dislikes,
    loadComments,

} from '../../actions/PostAction/PostAction'

import {
    Button as PaperButton
} from 'react-native-paper'

import Modal from 'react-native-modal'
import {
    showErrorMessage,
    showNormalMessage,
    showSuccessMessage,
    showWarningMessage
} from '../../utilities/NotificationUtilities/NotificationUtilities'

import Colors from './../../asserts/Colors';

import Loader from '../Loader/Loader'

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
            video: { width: undefined, height: undefined, undefined },
            thumbnailUrl: undefined,
            videoUrl: undefined,
            modalVisible: false,
            paused: false,
            repeat: true,
            volume: 1,
            rate: 2,
            pausedText: 'Play',
            muted: true,
            duration: 0.0,
            currentTime: 0.0,
            isModalVisible: false,
            commmentLoader: false
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
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    componentDidMount() {
        // this.loadComments()
    }

    setCommentLoader = () => {
        this.setState({
            commmentLoader: true
        })
    }

    unSetCommentLoader = () => {
        this.setState({
            commmentLoader: false
        })
    }


    addComment = () => {
        this.setCommentLoader()
        addComment(this.props.postId, this.state.comment).then((res) => {
            this.loadComments()
            this.hideLoader();
        })
            .finally(() => {
                this.unSetCommentLoader()
            })
    }

    loadComments = () => {
        loadComments(this.props.postId).then((res) => {
            if (res.status == "success") {
                this.setState({
                    comments: res.data,
                    comment: "",
                    commentcount: res.data.length
                })
            }
        })
    }

    onLoad = (data) => {
        this.setState({ duration: data.duration })
    }

    onPress = () => {
        this.setState({ currentTime: data.currentTime })
    }

    onEnd = () => {
        this.setState({ pausedText: "Play", paused: true })
        this.video.seek(0)
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

    render() {
        return (
            <View style={{ ...styles.container }}>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={require("./../../asserts/images/profile.png")} />
                            <Body>
                                <Text>{this.props.users.name}</Text>
                                <Text style={{ fontStyle: 'italic' }} note>@{this.props.users.email}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Text> {this.props.message} </Text>
                    </CardItem>
                    <CardItem cardBody>
                        {this.props.type === 'IMAGE' &&
                            <Image
                                source={{ uri: `${IMAGE_BASE}${this.props.logo}` }}
                                style={{ ...styles.imageStyle }}
                            />
                        }
                        {
                            this.props.type === 'VIDEO' &&
                            <View style={{
                                    width: "95%",
                                    marginLeft: 6
                                }} 
                            >
                                <VideoPlayer
                                    video={{ uri: `${IMAGE_BASE}${this.props.logo}` }}
                                    // videoWidth={2500}
                                    style={{borderRadius: 5}}
                                    // videoHeight={1600}
                                    thumbnail={require('./../../asserts/images/logo.png')}
                                />
                            </View>
                        }

                    </CardItem>
                    <CardItem>
                        <Left>
                            <Button transparent onPress={this.likes} >
                                <Icon active style={{ color: this.state.likecolor, fontSize: 25 }} name="thumbs-up" />
                                <Text> {this.state.likecount} </Text>
                            </Button>
                        </Left>
                        <Body>
                            <Button transparent onPress={this.dislikes}  >
                                <Icon active style={{ color: this.state.dislikecolor, fontSize: 25 }} name="thumbs-down" />
                                <Text> {this.state.dislikecount} </Text>
                            </Button>
                        </Body>
                        <Body>
                            <Button transparent onPress={this.toggleModal} >
                                <Icon style={{ fontSize: 25 }} active name="chatbubbles" />
                                <Text> {this.state.commentcount} </Text>
                            </Button>
                        </Body>
                        <Right>
                            <Text>11h ago</Text>
                        </Right>
                    </CardItem>
                </Card>

                <View style={{ flex: 1 }} >
                    <Modal style={styles.modal} isVisible={this.state.isModalVisible}>
                        <View style={styles.modalhead} >
                            <Text style={styles.title} >Comments</Text>
                            <Button transparent onPress={this.toggleModal} >
                                <Icon style={{ fontSize: 30 }} active name="close" />
                            </Button>
                        </View>
                        <ScrollView style={styles.scroll}>
                            {this.state.comments.map((val, ind) => (
                                <View style={styles.commentuser} >
                                    <Thumbnail style={{ height: 30, width: 30 }} source={require("./../../asserts/images/profile.png")} />
                                    <Text style={{ marginLeft: 8 }}>{val.comment}</Text>
                                </View>
                            ))
                            }
                            <View style={styles.commentpost} >
                                <Button transparent onPress={this.toggleModal} >
                                    <Icon style={{ fontSize: 25 }} active name="camera" />
                                </Button>
                                <TextInput value={this.state.comment}
                                    onChangeText={text => this.setState({ comment: text })}
                                    placeholder="Comment"
                                    style={{ width: '70%' }}>
                                </TextInput>
                                {this.state.commmentLoader &&
                                    <Spinner />
                                }
                                {!this.state.commmentLoader &&
                                    <Button disabled={this.state.comment.length <= 0} transparent onPress={this.addComment} >
                                        <Icon color={this.state.comment.length <= 0 ? "grey" : ""} style={{ fontSize: 25 }} active name="send" />
                                    </Button>
                                }
                            </View>
                            {this.state.isLoading &&
                                <Loader visible={this.state.isLoading} />
                            }
                        </ScrollView>
                    </Modal>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 5
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: 300
    },
    icons: {
        width: 30,
        height: 30,
    },
    cardaction: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: 300
    },
    cardbody: {
        // height: 300,
        width: null,
        flex: 1
    },
    modalhead: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: 5
    },
    title: {
        fontWeight: "bold",
        fontSize: 17,
        fontFamily: 'sans-serif',
        marginLeft: 10
    },
    scroll: {
        flex: 1,
        marginLeft: 3,
    },
    commentpost: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: 10
    },
    commentuser: {
        marginLeft: 5,
        alignItems: 'center',
        margin: 5,
        flexDirection: 'row'
    },
    imageStyle: {
        height: 300,
        width: "95%",
        borderRadius: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 6
    }
});