import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import Colors from '../styles/Colors';

export default class CollectionCard extends React.Component {
  render() {
    const {item} = this.props;
    console.log(item);
    const visibleTiles = 9;

    return (
      <View style={styles.card}>
        <View style={styles.images}>
          {item.map((photo, photoId) => {
            let visiblePhotos = visibleTiles - 1;

            if (photoId <= visiblePhotos) {
              return (
                <Image
                  key={photoId}
                  style={styles.tile}
                  source={{uri: photo.node.image.uri}}
                />
              );
            }
          })}
        </View>

        <BlurView
          style={styles.info}
          blurType="light"
          blurAmount={25}
          reducedTransparencyFallbackColor="white">
          <Text style={styles.title}>
            {'Collection from ' + new Date().toLocaleDateString('de-AT')}
          </Text>
          <Text style={styles.text}>
            "You've made quite a few images that day. Start sorting out your
            photos! ..."
          </Text>
        </BlurView>
      </View>
    );
  }
}

const imageSize = (count, margin) =>
  (100 - margin * count - 2 * margin) / count;
const imageMargin = 1;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    marginHorizontal: 20,
    marginTop: 20,
    overflow: 'hidden',
    borderRadius: 20,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    backgroundColor: Colors.bgDark,
  },
  images: {
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
    borderColor: Colors.text,
    margin: imageMargin,
  },
  more: {
    backgroundColor: Colors.bgDarker,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  info: {
    padding: 10,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
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
