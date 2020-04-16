import React from 'react';
import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import {
  SharedElement,
  SharedElementTransition,
  nodeFromRef,
} from 'react-native-shared-element';
import {BlurView} from '@react-native-community/blur';
import Colors from '../../styles/Colors';
import PhotoLibrary from '../../components/PhotoLibrary';

export class HomeScreen extends React.Component {
  state = {
    collections: PhotoLibrary.collections,
  };

  render() {
    const collections = this.state.collections;
    console.log(this.state.collections);

    return (
      <View style={styles.cardContainer}>
        <FlatList
          inverted
          extraData={false}
          ListEmptyComponent={
            <Text>There are no images in your Camera Roll</Text>
          }
          data={Object.entries(collections)}
          renderItem={({item}) => {
            const key = item[0];
            const collection = item[1];
            const visibleTiles = 9;

            return (
              <View
                style={styles.card}
                key={key}
                onPress={() => this._onSelectCollection(key)}>
                <View style={styles.cardImages}>
                  {collection.slice(0, visibleTiles).map((photo, photoId) => {
                    let visiblePhotos = visibleTiles - 1;

                    if (photoId <= visiblePhotos) {
                      return (
                        <Image
                          key={photoId}
                          style={styles.cardTile}
                          source={{uri: photo.node.image.uri}}
                        />
                      );
                    } /* else if (photoId === visiblePhotos) {
                        return (
                          <Text
                            key={'more'}
                            style={[
                              styles.cardTile,
                              styles.cardMoreButton,
                            ]}>
                            {`+${collection.length - visiblePhotos} more`}
                          </Text>
                        );
                      } */
                  })}
                </View>

                <BlurView
                  style={styles.cardInfo}
                  blurType="light"
                  blurAmount={25}
                  reducedTransparencyFallbackColor="white">
                  <Text style={styles.cardTitle}>
                    {'Collection from ' +
                      new Date(key).toLocaleDateString('de-AT')}
                  </Text>
                  <Text style={styles.cardText}>
                    "You've made quite a few images that day. Start sorting out
                    your photos! ..."
                  </Text>
                </BlurView>
              </View>
            );
          }}
        />
      </View>
    );
  }

  async componentDidMount() {
    await PhotoLibrary.loadPhotos();
    await PhotoLibrary.loadAlbums();
    await PhotoLibrary.createCollections();
  }

  _onSelectCollection = key => {
    this.props.navigation.navigate('Swipe', {
      collection: this.state.collections[key],
      collectionId: key,
    });
  };
}

const cardImageSize = (count, margin) =>
  (100 - margin * count - 2 * margin) / count;
const cardImageMargin = 1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
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
  cardImages: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -cardImageMargin,
  },
  cardTile: {
    flexGrow: 1,
    flexShrink: 1,
    // Maximum 3 items per row
    width: cardImageSize(3, cardImageMargin) + '%',
    height: 0,
    aspectRatio: 1,
    borderColor: Colors.text,
    margin: cardImageMargin,
  },
  cardMoreButton: {
    backgroundColor: Colors.bgDarker,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  cardInfo: {
    padding: 10,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },
  cardTitle: {
    height: 20,
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
  cardText: {
    marginTop: 20,
    marginBottom: 10,
    color: 'white',
  },
});
