import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import Slider from '@react-native-community/slider';
import Swiper from 'react-native-deck-swiper';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
var cardWidth;
var cardHeight;
if (screenWidth > screenHeight) {
  cardHeight = screenHeight * 0.85;
  cardWidth = cardHeight / 3 * 4;
} else {
  cardWidth = screenWidth * 0.85;
  cardHeight = cardWidth / 3 * 4;
}
console.log(cardWidth + ' x ' + cardHeight);

export class SwipeScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
    };
    render() {
      const { images } = this.props.navigation.state.params;
      return (
        <View style={styles.vBox}>
          <Swiper
              cards={images}
              backgroundColor='transparent'
              marginTop={50}
              renderCard={(image, key) => {
                  return (
                      <View key={key} style={styles.card, {width: cardWidth, height: cardHeight}}>
                          <Image source={image} style={{width: cardWidth, height:cardHeight, borderRadius: 5}}></Image>
                      </View>
                  )
              }}
              onSwiped={(cardIndex) => {console.log(cardIndex)}}
              onSwipedAll={() => {console.log('onSwipedAll')}}
              cardIndex={0}
              stackSize={images.length}>
          </Swiper>
          <Slider
              style={{width: 200, height: 40}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
            />
            <View>
              <Button title='1'></Button>
              <Button title='2'></Button>
              <Button title='3'></Button>
            </View>
        </View>
      );
    }
  }



const styles = StyleSheet.create({
  vBox: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: 'green'
  },
  hBox: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: 'red'
  },
  hElement: {
    justifyContent: 'center'
  },
  card:{
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
