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
  Easing,
} from 'react-native';
import Slider from '@react-native-community/slider';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

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
const VIBRATE = false;

export class SwipeScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  state = {
    zoomPercentage: new Animated.Value(100),
    zoomPercentageSlider: 100,
    shownView: 0,
    shownImageIndex: 0,
    selectedDotOffset: new Animated.Value(-30),
  };
  imagesIndexMemory = [];

  vibrate() {
    if (VIBRATE) ReactNativeHapticFeedback.trigger('impactLight');
  }
  slideDot = offset => {
    Animated.spring(this.state.selectedDotOffset, {
      toValue: offset,
    }).start();
  };
  onPressedCards() {
    this.setState({shownView: 0});
    this.slideDot(-30);
    this.vibrate();
  }
  onPressedImages() {
    this.setState({shownView: 1});
    this.slideDot(30);
    this.vibrate();
  }
  scaleImageToPercent(percent, duration = 300) {
    Animated.timing(this.state.zoomPercentage, {
      toValue: percent,
      duration: duration,
      easing: Easing.ease,
    }).start();
    this.setState({zoomPercentageSlider: percent});
  }
  imagePressed(evt, index) {
    this.vibrate();
    if (this.state.zoomPercentage._value > 100) {
      this.scaleImageToPercent(100);
      return;
    }
    const x = evt.nativeEvent.locationX;
    if (x > screenWidth * 0.75) {
      console.log('keep');
      this.swiper.swipeRight();
    } else if (x < screenWidth * 0.25) {
      console.log('delete');
      this.swiper.swipeLeft();
    } else {
      return;
    }
  }
  cardSwipedRight(index) {
    console.log(`swiped right: ${index}`);
    this.setState(prevState => ({
      shownImageIndex: parseInt(prevState.shownImageIndex) + 1,
    }));
    if (index == this.props.navigation.state.params.images.length - 1) {
      this.finalize();
    }
  }
  cardSwipedLeft(index) {
    console.log(`swiped left: ${index}`);
    this.setState(prevState => ({
      shownImageIndex: parseInt(prevState.shownImageIndex) + 1,
    }));
    if (index == this.props.navigation.state.params.images.length - 1) {
      this.finalize();
    }
  }
  finalize() {
    console.log('last one swiped');
  }

  render() {
    const {images} = this.props.navigation.state.params;
    const {shownView, shownImageIndex} = this.state;
    console.log(images);
    console.log(`${shownImageIndex} == ${0}`);
    return (
      <View style={styles.container}>
        {/* !!                     TINDER CARD STACK                       !!! */}
        <View
          style={{
            flex: 8,
            margin: 50,
            display: shownView == 0 ? 'flex' : 'none',
          }}>
          <CardStack
            renderNoMoreCards={() => {}}
            disableBottomSwipe={true}
            disableTopSwipe={true}
            onSwipedLeft={index => this.cardSwipedLeft(index)}
            onSwipedRight={index => this.cardSwipedRight(index)}
            style={[
              styles.content,
              {
                alignSelf: 'stretch',
                marginHorizontal: -20,
                marginTop: 50,
              },
            ]}
            ref={swiper => {
              this.swiper = swiper;
            }}>
            {images.map((image, index) => (
              <Card
                key={`card#${index}`}
                style={[styles.card, {width: cardWidth, height: cardHeight}]}>
                <Animated.Image
                  source={image}
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    borderRadius: 5,
                    transform: [
                      {
                        scale: this.state.zoomPercentage.interpolate({
                          inputRange: [100, 750],
                          outputRange: [1, 7.5],
                        }),
                      },
                    ],
                  }}></Animated.Image>
              </Card>
            ))}
          </CardStack>
        </View>
        {/* !!!                   IMAGE TAP STACK                   !!! */}
        <View
          style={{
            flex: 8,
            marginVertical: 50,
            display: shownView == 1 ? 'flex' : 'none',
          }}>
          {images.map(
            (image, index) =>
              shownImageIndex == index && (
                <TouchableOpacity
                  key={`image#${index}`}
                  activeOpacity={0.75}
                  style={{
                    display: shownImageIndex == index ? 'flex' : 'none',
                  }}
                  onPress={evt => this.imagePressed(evt, index)}>
                  <Animated.Image
                    source={image}
                    resizeMode="contain"
                    style={{
                      width: screenWidth * 0.95,
                      height: screenHeight * 0.65,
                      alignSelf: 'center',
                      borderRadius: 5,
                      transform: [
                        {
                          scale: this.state.zoomPercentage.interpolate({
                            inputRange: [0, 1000],
                            outputRange: [0, 10],
                          }),
                        },
                      ],
                    }}></Animated.Image>
                </TouchableOpacity>
              ),
          )}
        </View>

        {/* !!!                   BOTTOM CONTROLLER                   !!! */}
        <View style={[styles.overlayCard, {flex: 2}]}>
          <View style={styles.vBox}>
            <View style={[styles.hBox, {flex: 2}]}>
              <TouchableOpacity
                style={{marginLeft: 20}}
                onPress={() => this.swiper.swipeLeft()}>
                <Icon name="delete" size={40} color="rgb(236, 114, 110)" />
              </TouchableOpacity>
              <View style={[styles.vBox, {flex: 1}]}>
                <Slider
                  style={[styles.slider, {flex: 1}]}
                  minimumValue={100}
                  maximumValue={750}
                  minimumTrackTintColor="#555087"
                  maximumTrackTintColor="#aaaad6"
                  onValueChange={v => this.scaleImageToPercent(parseInt(v), 0)}
                  value={this.state.zoomPercentageSlider}
                />
                <Text style={[styles.smallText, {flex: 1}]}>
                  {this.state.zoomPercentageSlider / 100}x
                </Text>
              </View>
              <TouchableOpacity
                style={{marginRight: 20}}
                onPress={() => this.swiper.swipeRight()}>
                <Icon
                  name="content-save"
                  size={40}
                  color="rgb(115, 200, 128)"
                />
              </TouchableOpacity>
            </View>

            <View style={[styles.hBox, {flex: 1}]}>
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
                flex: 1,
              }}>
              <Icon name="circle-small" size={20} color="#555087" />
            </Animated.View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 0,
  },
  vBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hBoxStretch: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    padding: 20,
  },
  overlayCard: {
    borderRadius: 15,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    backgroundColor: '#ffffff',
    padding: 10,
    alignSelf: 'stretch',
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
  slider: {
    width: 200,
    height: 20,
    margin: 5,
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
