import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import TouchableScale from 'react-native-touchable-scale';
import Colors from '../styles/Colors';
import {Collection} from '../models/HomeModel';
import _ from 'lodash';
import {rgbToHex, rgbApplyAlpha} from '../utils/Colors';
import {HomeScreenNavigationProp} from '../screens/home/HomeScreen';

type Props = {
  collection: Collection;
  navigation: HomeScreenNavigationProp;
};

export default class CollectionCard extends React.Component<Props, {}> {
  render() {
    const photos = this.props.collection.photos;
    // const color = this.props.collection.dominantColor;
    // let lighterColor = rgbApplyAlpha(color, 0.8);
    // let darkerColor = rgbApplyAlpha(color, 1.2);
    // let gradientColors = [rgbToHex(lighterColor), rgbToHex(color), rgbToHex(darkerColor)]

    const visibleTiles = 9;

    return (
      <TouchableScale
        activeScale={0.95}
        friction={5}
        tension={50}
        onPress={() =>
          this.props.navigation.navigate('Swipe', {
            collection: this.props.collection,
          })
        }>
        <View style={styles.shadowContainer}>
          <View style={styles.card}>
            <View style={styles.photos}>
              {photos.map((photo, photoId) => {
                let visiblePhotos = visibleTiles - 1;

                if (photoId < visiblePhotos) {
                  return (
                    <Image
                      key={photoId}
                      style={styles.tile}
                      source={{uri: photo.node.image.uri}}
                    />
                  );
                } else if (photoId === visiblePhotos) {
                  return (
                    <View style={styles.tile}>
                      <Text key={'more'} style={styles.moreText}>
                        {`+${photos.length - visiblePhotos} more`}
                      </Text>
                    </View>
                  );
                }
              })}
            </View>

            <LinearGradient
              colors={[Colors.primaryLight, Colors.primary]}
              style={styles.info}>
              <Text style={styles.title}>
                {'Collection from ' + new Date().toLocaleDateString('de-AT')}
              </Text>
              <Text style={styles.text}>
                {
                  "You've made quite a few images that day. Start sorting out your photos! ..."
                }
              </Text>
            </LinearGradient>
          </View>
        </View>
      </TouchableScale>
    );
  }
}

const imageSize = (count: number, margin: number) =>
  (100 - margin * count - 2 * margin) / count;
const imageMargin = 1;

const styles = StyleSheet.create({
  shadowContainer: {
    shadowColor: 'rgba(0,0,0,0.8)',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 5,
  },
  card: {
    flexDirection: 'column',
    marginHorizontal: 20,
    marginTop: 20,
    overflow: 'hidden',
    borderRadius: 20,
    backgroundColor: Colors.bgDark,
  },
  photos: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -imageMargin,
  },
  tile: {
    flexGrow: 1,
    flexShrink: 1,
    // Maximum 3 items per row
    width: imageSize(3, imageMargin) + '%',
    height: 0,
    aspectRatio: 1,
    backgroundColor: Colors.bgDarker,
    margin: imageMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  info: {
    padding: 10,
    // position: 'absolute',
    // left: 0,
    // bottom: 0,
    // right: 0,
  },
  title: {
    height: 20,
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
  text: {
    marginTop: 20,
    marginBottom: 10,
    color: 'white',
  },
});
