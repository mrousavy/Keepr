import React from 'react';
import { Modal, StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native';

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
                        <Text>Hi.</Text>
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
  }
});
