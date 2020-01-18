import React, {Component} from 'react';
import { Modal, Button, StyleSheet, Text, View, TouchableHighlight, NativeModules, Alert } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { ImageBrowser } from 'expo-multiple-media-imagepicker';
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
                    <View style={{marginTop: 22}}>
                        <Text>Pick an image</Text>
                        <ImageBrowser
                            callback={(num, onSubmit) => {}}
                            headerCloseText={'キャンセル'} // Close button text on header. default is 'Close'.
                            headerDoneText={'　　完了'} // Done button text on header. default is 'Done'.
                            headerButtonColor={'#E31676'} // Button color on header.
                            headerSelectText={'枚の画像を選択中'} // Word when picking.  default is 'n selected'.
                            mediaSubtype={'screenshot'} // Only iOS, Filter by MediaSubtype. default is display all.
                            badgeColor={'#E31676'} // Badge color when picking.
                            emptyText={'選択できる画像がありません'} // Empty Text
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
