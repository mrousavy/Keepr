import React from 'react';
import { Modal, StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import ImagePicker from "react-native-customized-image-picker";
import LinearGradient from 'react-native-linear-gradient';

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
            <View>
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        this.openImagePicker();
                    }}>
                    <View style={styles.textContainer}>
                        <LinearGradient colors={['#99ccff', '#66b3ff', '#3399ff']} style={styles.linearGradient}>
                            <Text style={styles.buttonText}>Pick image</Text>
                        </LinearGradient>
                    </View>
                </TouchableOpacity>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    flex: 1,
    borderRadius: 55
  },
  button:{
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5,
    backgroundColor:'#fff',
    zIndex: 0,
    width:120,
    height:55,
    backgroundColor: 'transparent'
  },
  buttonText: {
      fontSize: 18,
      color: 'rgb(100,100,100)',
      fontWeight: 'bold',
      fontSize: 18,
      margin: 10,
      width: 200
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
  }
});
