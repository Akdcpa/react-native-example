import React, { Component } from 'react'
import {
    View,
    ScrollView,
    StyleSheet,
    Image,
    RefreshControl,
} from 'react-native'
import {
    Container,
    Content,
    Item,
    Icon,
    Button,
    Input
} from 'native-base';
import {
    PostComponent,
    Loader,
    NBHeader
} from '../../components'

import {
    getPosts,
    searchPosts
} from '../../actions/PostAction/PostAction'

import { FloatingAction } from "react-native-floating-action";

import {
    useNavigation
} from '@react-navigation/native'

import Colors from './../../asserts/Colors';


const actions = [
    {
        text: "PostPhoto",
        icon: require("../../asserts/images/image-posts.png"),
        name: "post_photo",
        position: 3,
        buttonSize: 50,
        color: '#b64d00'
    },
    {
        text: "PostVideo",
        icon: require("../../asserts/images/video.png"),
        name: "post_video",
        position: 2,
        buttonSize: 46,
        color: '#5400b9'
    },
    {
        text: "PostComment",
        icon: require("../../asserts/images/pencil.png"),
        name: "post_comment",
        position: 1,
        buttonSize: 42,
        color: '#3aa600'
    },


];

export default class PostScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            isModalVisible: false,
            ImageSource: null,
            isLoading: false,
            isRefreshing: false
        }
        this.initialLoad = this.initialLoad.bind(this)
        func: this.props.navigation.openDrawer();
        this.onRefresh = this.onRefresh.bind(this)
    }

    componentDidMount = async () => {
        setTimeout(() => {
            this.initialLoad()
        }, 500);
        this.props.navigation.addListener('focus', () => {
            this.initialLoad()
        })
    };

    initialLoad = () => {
        // this.showLoader()
        this.showRefresh()
        getPosts().then((res) => {
            if (res.status = "success") {
                this.setState({
                    posts: res.data
                })
            }
        })
            .finally(() => {
                // this.hideLoader()
                this.hideRefresh()
            })
    }
 
    showRefresh = () =>{
        this.setState({
            isRefreshing:true
        })
    }

    hideRefresh = () =>{
        this.setState({
            isRefreshing:false
        })
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    onRefresh = () => { 
        this.showRefresh();
        this.initialLoad()
    }

    searchPost = (search) => {
        if(search == "") {
            this.initialLoad()
        } else {
            this.showLoader()
            searchPosts(search).then((res) => {
                if(res.status == "success") {
                    this.setState({
                        posts: res.data
                    })
                }
            })
            .finally(() => {
                this.hideLoader()
            })
        }
    }

    render() {

        const FabComponent = props => {
            const navigation = useNavigation();
            return (
                <FloatingAction
                    buttonSize={59}
                    actionsPaddingTopBottom={5}
                    actions={actions}
                    onPressItem={name => {
                        navigation.navigate('PickFile', { type: name })
                    }}
                />
            )

        }

        return (
            <Container>
                <NBHeader
                    navigation={this.props.navigation}
                    title={`Post Book`}
                />
                <View style={{...styles.searchBarView}}>
                    <Item rounded style={{width: "100%"}}>
                        <Icon name="ios-search" />
                        <Input 
                            onChangeText={(search) => this.searchPost(search)}
                            placeholder="Search" 
                        />
                    </Item>
                </View>
                <Content
                    refreshControl={
                        <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh} />
                    }
                > 
                    {this.state.posts.length > 0 && this.state.posts.map((items, index) => {
                        return (
                                <PostComponent
                                    key={index}
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
                    )
                    })
                    }

                </Content>
                {!this.state.isLoading &&
                    <FabComponent />
                }
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    searchBarView: {
        flexDirection: 'row', 
        margin: 10, 
        height: 45
    },
    modal: {
        backgroundColor: 'white'
    },
    root: {
        flexGrow: 1,
        justifyContent: 'center'
    },
    container: {
        flex: 1
    },
    textinput: {
        width: '100%'
    }
});