import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, NativeModules } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


export class StartScreen extends React.Component {
    state = {
      images: null,
    };

    static navigationOptions = {
      title: 'Start',
    };
    render() {
        let { images } = this.state;
        const {navigate} = this.props.navigation;
        return (
            <Button
            title="Pick images"
            onPress={() => this._pickImage()}
            />
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

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
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
