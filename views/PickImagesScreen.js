import React from 'react';
import { Modal, StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import ImagePicker from "react-native-customized-image-picker";
import LinearGradient from 'react-native-linear-gradient';
import {PalewaveColors} from '../PalewaveColors';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export class PickImagesScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
    };
    state = {
      images: null
    };

    render() {
        return (
            <View style={styles.vBox}>

                <View style={styles.hBox}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            this.openImagePicker();
                        }}>
                        <LinearGradient colors={['#aaaad6', '#8484b5']} style={styles.linearGradient}>
                            <Text style={styles.buttonText}>Pick images</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>


                <Text style={styles.smallText}>an app by mrousavy.</Text>
            </View>
        );
    }

    openImagePicker() {
        ImagePicker.openPicker({
            multiple: true
        }).then(images => {
            var mappedImages = images.map(i => {
                console.log('received image', i);
                return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
            });
            this.props.navigation.navigate('Swipe', {images: mappedImages});
        }).catch(e => {
            console.log(e);
        });
    }

    imageBrowserCallback(images) {
        console.log(images);
    }

    componentDidMount() {
        console.log('gotta check for permissions');
    }
}


const styles = StyleSheet.create({
    vBox: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    hBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
  button:{
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 3,
      height: 5
    },
    shadowOpacity: 0.5
  },
  linearGradient: {
    borderRadius: 55,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonText: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold',
  },
  smallText: {
      fontSize: 10,
      color: 'rgb(150,150,150)',
      fontWeight: 'bold',
      margin: 10
  },
  card:{
    width: 320,
    height: 470,
    backgroundColor: '#FE474C',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
  }
});
