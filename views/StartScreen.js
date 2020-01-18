import React from 'react';
import { Modal, StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native';
import { ImageBrowser } from '../lib/ImageBrowser';
import * as Permissions from 'expo-permissions';


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
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showPopup}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                        <View>
                            <ImageBrowser
                                onChange={(num) => {console.log(num);}}
                                callback={(num, onSubmit) => {}}
                                />
                        </View>
                </Modal>

                <TouchableHighlight
                    onPress={() => {
                        this.setState({showPopup: true});
                    }}>
                    <Text>Pick image</Text>
                </TouchableHighlight>
            </View>
        );
    }

    componentDidMount() {
      this.getPermissionAsync();
      console.log('hi');
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
