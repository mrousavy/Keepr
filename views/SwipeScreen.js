import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Swiper from 'react-native-deck-swiper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
var cardWidth;
var cardHeight;
if (screenWidth > screenHeight) {
  cardHeight = screenHeight * 0.85;
  cardWidth = (cardHeight / 3) * 4;
} else {
  cardWidth = screenWidth * 0.85;
  cardHeight = (cardWidth / 3) * 4;
}
console.log(cardWidth + ' x ' + cardHeight);

export class SwipeScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  state = {
    zoomPercentage: 100,
    selectedDotOffset: new Animated.Value(-30),
  };
  slideDot = offset => {
    Animated.spring(this.state.selectedDotOffset, {
      toValue: offset,
    }).start();
  };
  onPressedCards() {
    this.slideDot(-30);
  }
  onPressedImages() {
    this.slideDot(30);
  }

  render() {
    const {images} = this.props.navigation.state.params;
    console.log(images);
    return (
      <View style={styles.container}>
        <View style={styles.hBoxStretch}>
          <Swiper
            cards={images}
            backgroundColor="transparent"
            marginTop={50}
            animateCardOpacity={true}
            childrenOnTop={true}
            useViewOverflow={false}
            renderCard={(image, key) => {
              return (
                <View
                  key={key}
                  style={(styles.card, {width: cardWidth, height: cardHeight})}>
                  <Image
                    source={image}
                    style={{
                      width: cardWidth,
                      height: cardHeight,
                      borderRadius: 5,
                    }}></Image>
                </View>
              );
            }}
            onSwiped={cardIndex => {
              console.log(cardIndex);
            }}
            onSwipedAll={() => {
              console.log('onSwipedAll');
            }}
            cardIndex={0}
            stackSize={images.length}></Swiper>
        </View>

        <View style={styles.vBox}>
          <Slider
            style={{width: 200, height: 20}}
            minimumValue={100}
            maximumValue={1000}
            minimumTrackTintColor="#555087"
            maximumTrackTintColor="#aaaad6"
            onValueChange={v => this.setState({zoomPercentage: parseInt(v)})}
            value={this.state.zoomPercentage}
          />
          <Text style={styles.smallText}>{this.state.zoomPercentage}%</Text>
        </View>
        <View style={styles.hBox}>
          <TouchableOpacity onPress={() => this.onPressedCards()}>
            <Icon name="cards" size={40} color="#555087" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 20}}
            onPress={() => this.onPressedImages()}>
            <Icon name="image-move" size={40} color="#555087" />
          </TouchableOpacity>
        </View>
        <Animated.View
          style={{
            transform: [
              {
                translateX: this.state.selectedDotOffset,
              },
            ],
          }}>
          <Icon
            style={{margin: 0}}
            name="circle-small"
            size={20}
            color="#555087"
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  vBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  hBox: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  hBoxStretch: {
    flex: 8,
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginLeft: -10,
    padding: 20,
    backgroundColor: 'red',
  },
  card: {
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    alignSelf: 'center',
  },
  label: {
    lineHeight: 200,
    textAlign: 'center',
    fontSize: 55,
    fontFamily: 'System',
    color: '#ffffff',
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 220,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  smallText: {
    fontSize: 14,
    color: 'rgb(50,50,50)',
    fontWeight: '200',
  },
});
