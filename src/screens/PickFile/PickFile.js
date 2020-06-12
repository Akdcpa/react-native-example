import React, { Component } from 'react'

import { TouchableOpacity } from 'react-native-gesture-handler'

import Modal from 'react-native-modal';

import {
  StyleSheet,
  ActivityIndicator,
  View,
  Image,
  PermissionsAndroid,
  Text
} from 'react-native';

import {
  Button,
  TextInput
} from 'react-native-paper'

import ImagePicker from 'react-native-image-picker';

import { createPosts } from '../../actions/PostAction/PostAction'
import {
  Button as BaseButton,
  Icon,
  Content,
  Container
} from 'native-base'
import { showSuccessMessage } from '../../utilities/NotificationUtilities/NotificationUtilities';
import DocumentPicker from 'react-native-document-picker';
import VideoPlayer from 'react-native-video-player';


export default class PickFile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalVisible: false,
      totalFiles: 0,
      selected: [],
      hasPermission: false,
      show: false,
      ImageSource: null,
      showstate: 'none',
      addIcon: true,
      openText: false,
      openPhoto: 'none',
      showImage: false,
      pictures: null,
      comment: '',
      type: '',
      isLoading: false,
      VideoSource: null
    }
    this.onBackPress = this.onBackPress.bind(this)
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
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
        console.log("image response pick", response)
        let source = response;
        // let formData = new FormData()
        // formData.append("message", "comments")
        // formData.append("type", "IMAGE")
        // formData.append("image", {
        //   data: `data:${response.type};base64,${response.data}`,
        //   uri: response.uri,
        //   path: response.path,
        //   name: response.fileName,
        //   type: response.type,
        //   size: response.fileSize
        // })
        // createPosts(formData).then((res) => {
        //   if (res.status == "success") {
        //     // RTSuccess(res.message)
        //     // this.props.onLoad()
        //     showSuccessMessage("Post successfully Updated")
        //     this.props.navigation.goBack()
        //     this.setState({
        //       comment: "",
        //       ImageSource: null,
        //       type: "",
        //     })
        //   }
        // })
        //   .finally(() => {
        //     this.setState({
        //       openText: false,
        //       isLoading: false
        //     })
        //   })
        this.setState({
          ImageSource: source,
          type: 'IMAGE'
        });
      }
    });
    console.log("Choosed Data : ", this.state.ImageSource)
  }

  async selectVideoTapped() {

    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],

      });

      this.setState({
        ImageSource: res,
        type: "VIDEO"
      });
      console.log("Res :", res)

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Canceled');
      } else {
        console.log('Unknown Error: ', JSON.stringify(err));
        throw err;
      }
    }
  }

  handleSubmit = () => {
    const data = {
      // pic:this.state.ImageSource.uri,
      comment: this.state.Comment
    }
    if (this.state.type == "VIDEO") {
      this.createVideoPost()
    } else {
      this.createPost()
    }
  }

  createPost = () => {

    let formData = new FormData();

    formData.append("message", this.state.comment)
    // this.sendPost(formData)

    if (this.state.type == "IMAGE" || this.state.type == "VIDEO") {
      let response = this.state.ImageSource;
      formData.append("image", {
        data: `data:${response.type};base64,${response.data}`,
        uri: response.uri,
        path: response.path,
        name: response.fileName,
        type: response.type,
        size: response.fileSize
      });
      formData.append("type", this.state.type)
      this.sendPost(formData)

    } else {
      this.sendPost(formData)
    }
  }

  createVideoPost = () => {

    let formData = new FormData();

    formData.append("message", this.state.comment)
    // this.sendPost(formData)

    if (this.state.type == "IMAGE" || this.state.type == "VIDEO") {
      let response = this.state.ImageSource;
      formData.append("image", response);
      formData.append("type", this.state.type)
      this.sendPost(formData)

    } else {
      this.sendPost(formData)
    }
  }

  sendPost = (formData) => {
    this.setState({
      isLoading: true
    })
    createPosts(formData).then((res) => {
      if (res.status == "success") {
        showSuccessMessage("Post successfully Updated!")
        this.props.navigation.goBack()
        this.setState({
          comment: "",
          ImageSource: null,
          type: "",
        })
      }
    })
      .finally(() => {
        this.setState({
          openText: false,
          isLoading: false
        })
      })
  }


  onBackPress = () => {
    this.props.navigation.goBack()
    this.setState({
      comment: "",
      ImageSource: null,
      type: "",
    })
  }

  render() {
    return (
      <Container stlyle={styles.root} >
        <Content>
          <TouchableOpacity
            onPress={this.onBackPress}
          >
            <View style={styles.head}  >
              <Icon style={{ fontSize: 30 }} active name="ios-arrow-back" />
              <Text style={styles.post} >Back</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.picker} >

            {
              this.props.route.params.type === "post_photo" &&
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <View style={styles.ImageContainer}>
                  {this.state.ImageSource === null ? <Text style={{ padding: 15, fontSize: 20 }}>Select a Photo</Text> :
                    <Image style={styles.ImageContainer} source={this.state.ImageSource} style={{ ...styles.imageStyle }} />
                  }
                </View>
              </TouchableOpacity>

            }
            {
              this.props.route.params.type === "post_video" &&

              <TouchableOpacity>

                <View style={{width: "100%"}}>
                  {this.state.ImageSource === null ?
                    <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
                      <Text style={{ padding: 15, fontSize: 20 }}>Select a Video</Text>
                    </TouchableOpacity>
                    :
                      <VideoPlayer
                        video={{ uri: this.state.ImageSource.uri }}
                        videoWidth={2500}
                        style={{ borderRadius: 5 }}
                        videoHeight={1600}
                        thumbnail={require('./../../asserts/images/logo.png')}
                      />
                  }
                </View>
                {this.state.ImageSource != null &&
                  <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
                    <Text style={{ fontSize: 20, marginTop: 10, textAlign: 'center' }}>Take another video</Text>
                  </TouchableOpacity>
                }
              </TouchableOpacity>

            }
          </View>

          <TextInput label="Caption"
            value={this.state.comment}
            onChangeText={text => this.setState({ comment: text })}
            style={styles.textinput}
          />

          <Button style={styles.button}
            mode="contained"
            disabled={this.state.isLoading}
            loading={this.state.isLoading}
            onPress={this.handleSubmit}
          >
            Post
                </Button>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  container: {
    flex: 1
  },
  textinput: {
    margin: 8
  },
  button: {
    margin: 8
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 3,
    marginLeft: 10,
  },
  post: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 5,
    marginLeft: 10
  },
  picker: {
    justifyContent: 'center',
    alignSelf: 'center'
  },
  pickImageContainer: {
    width: "95%"
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
})