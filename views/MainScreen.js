import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';

export class MainScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
    };
    render() {
      const { images } = this.props.navigation.state.params;
      return (
        <View style={styles.vBox}>
          <Swiper style={styles.hBox}
              cards={images}
              backgroundColor='transparent'
              marginTop={50}
              renderCard={(image, key) => {
                  return (
                      <View key={key} style={styles.card}>
                          <Image source={image} style={{width: 320, height:470, borderRadius: 5}}></Image>
                      </View>
                  )
              }}
              onSwiped={(cardIndex) => {console.log(cardIndex)}}
              onSwipedAll={() => {console.log('onSwipedAll')}}
              cardIndex={0}
              stackSize={images.length}>
          </Swiper>
          <Text>Hi</Text>
        </View>
      );
    }

    componentDidMount() {
      console.log();
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
  card:{
    width: 320,
    height: 470,
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
    alignSelf: 'center'
  },
  label: {
    lineHeight: 200,
    textAlign: 'center',
    fontSize: 55,
    fontFamily: 'System',
    color: '#ffffff',
  },
  footer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonContainer:{
    width:220,
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  button:{
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    zIndex: 0,
  }
});
