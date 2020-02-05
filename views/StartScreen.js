import React from 'react';
import { Modal, StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native';
import { Permissions } from 'expo-permissions';
import { ImageBrowser } from 'expo-multiple-media-imagepicker';


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
                            max={101} // Maximum number of pickable image. default is None
                            headerCloseText={'close'} // Close button text on header. default is 'Close'.
                            headerDoneText={'done'} // Done button text on header. default is 'Done'.
                            headerButtonColor={'#E31676'} // Button color on header.
                            headerSelectText={'n selected'} // Word when picking.  default is 'n selected'.
                            badgeColor={'#E31676'}
                            emptyText={'empty.'}
                            callback={(asset) => {
                                Alert.alert(asset);
                            }}
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

    imageBrowserCallback(images) {
        console.log(images);
    }

    async componentDidMount() {
        const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        if (permission.status !== 'granted') {
            const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (newPermission.status === 'granted') {
                console.log('now granted');
            }
        } else {
            console.log('already granted');
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
