import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, NativeModules } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';

 class MainScreen extends React.Component {
    static navigationOptions = {
      title: 'Swiper',
    };
    render() {
      const {navigate} = this.props.navigation;
      return (
        <Button
          title="Go to Jane's profile"
          onPress={() => navigate('Profile', {name: 'Jane'})}
        />
      );
    }
  }
