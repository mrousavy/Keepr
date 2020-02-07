import React from 'react';
import { Modal, StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import ImagePicker from "react-native-customized-image-picker";
import LinearGradient from 'react-native-linear-gradient';
import {PalewaveColors} from '../PalewaveColors';

export class StartScreen extends React.Component {
    static navigationOptions = {
      title: 'Start',
    };
    state = {
      images: null,
      showPopup: false
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.centerContainer}>
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        this.openImagePicker();
                    }}>
                    <LinearGradient colors={['#aaaad6', '#aaaad6', '#70a5d5']} style={styles.linearGradient}>
                        <Text style={styles.buttonText}>Pick images</Text>
                    </LinearGradient>
                </TouchableOpacity>


                <Text style={styles.smallText}>an app by mrousavy.</Text>
            </View>
        );
    }

    openImagePicker() {
        ImagePicker.openPicker({
            multiple: true
        }).then(images => {
            console.log(images);
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
  centerContainer: {
      flex: 1,
      flexDirection: 'column',
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
    shadowOpacity: 0.5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
  }
});
