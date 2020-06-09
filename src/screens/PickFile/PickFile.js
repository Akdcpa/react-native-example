import React, { Component } from 'react' 

import { TouchableOpacity } from 'react-native-gesture-handler'
 
import Modal from 'react-native-modal'; 
 
import { StyleSheet, ActivityIndicator, View, Image, PermissionsAndroid , Text} from 'react-native';

import  { Button , TextInput } from 'react-native-paper'
 
import ImagePicker from 'react-native-image-picker';
 
import { createPosts } from '../../actions/PostAction/PostAction'
import {
  Button as BaseButton,
  Icon
} from 'native-base'
import { showSuccessMessage } from '../../utilities/NotificationUtilities/NotificationUtilities';

export default class PickFile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            isModalVisible: false,
            totalFiles: 0,
            selected: [],
            hasPermission: false,
            show:false,
            ImageSource: null,
            showstate: 'none',
            addIcon: true,
            openText: false,
            openPhoto: 'none',
            showImage: false,
            pictures: null,
            comment: '',
            type: '',
            isLoading: false
        }
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

      selectVideoTapped() {
        const options = {
          quality: 1.0,
          title:'Select Video',
          maxWidth: 500,
          maxHeight: 500,
          mediaType:'video',
          
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
              type:'VIDEO'
            });
          }
        });
        console.log("Choosed Data : " , this.state.ImageSource)
    }

    handleSubmit = () => {
        const data = {
            // pic:this.state.ImageSource.uri,
            comment: this.state.Comment
        }

        console.log("Picked Data : " , data)
        this.createPost()
    }

    createPost = () => {

        let formData = new FormData();

        formData.append("message", this.state.comment)
        this.sendPost(formData)

        // if (this.state.type == "IMAGE" || this.state.type == "VIDEO") {
        //     let picture = this.state.ImageSource.uri;
        //     let reader = new FileReader();
        //     reader.onload = (e) => {
        //         formData.append("image", picture);
        //         formData.append("type", this.state.type)
        //         this.sendPost(formData)
        //     };
        //     reader.readAsDataURL(picture);
        //     console.log("URL Specified : " , reader.readAsDataURL(picture))
        // } else {
        //     this.sendPost(formData)
        // }
    }

    sendPost = (formData) => {
        this.setState({
            isLoading: true
        })
        createPosts(formData).then((res) => {
            if (res.status == "success") {
                // RTSuccess(res.message)
                // this.props.onLoad()
                showSuccessMessage("Post successfully Updated")
                this.props.navigation.goBack()

                console.log("SuccessFully Updated")
            }
        })
            .finally(() => {
                this.setState({
                    type: "",
                    ImageSource: "",
                    openText: false,
                    isLoading: false
                })
            })
    }

    render() {
        return (
            <View stlyle={styles.root} > 
                  <TouchableOpacity  onPress={()=>this.props.navigation.goBack()} >
                    <View style={styles.head}  >
                      <Icon  style={{fontSize:30}} active name="ios-arrow-back" /> 
                      <Text style={styles.post} >Back</Text>
                    </View>
                  </TouchableOpacity>
                <View style={styles.picker} >

                      { 
                        this.props.route.params.type === "post_comment" &&
                        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                            {/* <View style={styles.ImageContainer}>
                              { this.state.ImageSource === null ? <Text>Select a Photo</Text> :
                              <Image style={styles.ImageContainer} source={this.state.ImageSource}/>
                              }
                            </View>   */}
                        </TouchableOpacity>

                      }
                    { 
                      this.props.route.params.type === "post_file" &&

                      <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
      
                          <View style={styles.ImageContainer}>
                          { this.state.ImageSource === null ?  
                            <Text>Select a Video</Text> 
                         :
                          <Image style={styles.ImageContainer} source={this.state.ImageSource} />
                          }
                          </View>
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
                    onPress={this.handleSubmit}>Post</Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root:{
        flexGrow:1,
        justifyContent:'center'
    },
    container: {
        flex: 1
      },
    textinput:{ 
        margin:8
    },
    button:{
      margin:8
    },
    head:{
      flexDirection:'row',
      alignItems:'center',
      margin:3,
      marginLeft: 10,
    },
    post:{
      fontSize:22,
      fontWeight:'bold',
      margin:5,
      marginLeft:10
    },
    picker:{
      justifyContent:'center',
      alignSelf:'center'
    }
})