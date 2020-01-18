import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, NativeModules } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';

 class StartScreen extends React.Component {
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


// import React from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, NativeModules } from 'react-native';
// import CardStack, { Card } from 'react-native-card-stack-swiper';

// var ImagePicker = NativeModules.ImageCropPicker;

// function pickImages() {
//   ImagePicker.openPicker({
//     multiple: true
//   }).then(images => {
//     console.log(images);
//   });
// }

// class StartScreen extends React.Component {
//     static navigationOptions = {
//       title: 'Swiper',
//     };
//     render() {
//       const {navigate} = this.props.navigation;
//       return (
//         <Button
//           title="Pick images"
//           onPress={() => pickImages()}
//         />
//       );
//     }
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }
// });
