import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Button,
  FlatList,
} from 'react-native';
import {BlurView, VibrancyView} from '@react-native-community/blur';
import CameraRoll from '@react-native-community/cameraroll';
import Colors from '../styles/Colors';

export class HomeScreen extends React.Component {
  state = {
    collections: [],
  };

  render() {
    const collections = this.state.collections;

    return (
      <SafeAreaView style={styles.container}>
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
                <View style={styles.card} key={key}>
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
                              styles.cardImageBorderTop,
                              styles.cardImageBorderRight,
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
                      {'collection at ' +
                        new Date(key).toLocaleDateString('de-AT')}
                    </Text>
                    <Button
                      title="Go to Collection"
                      style={styles.cardButton}
                      onPress={() => this._onSelectCollection(key)}
                    />
                  </BlurView>
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  componentDidMount() {
    this.loadPhotos();
  }

  _onSelectCollection = key => {
    this.props.navigation.navigate('Swipe', {
      collection: this.state.collections[key],
      collectionId: key,
    });
  };

  loadPhotos = async () => {
    let {edges: cameraRoll} = await CameraRoll.getPhotos({first: 50});
    let albums = await CameraRoll.getAlbums();

    // A helper function to create a JavaScript Date from a timestamp
    let toDate = timestamp => new Date(timestamp * 1000);
    // A helper function to create a JavaScript Date from a timestamp, omitting hours, minutes, seconds and miliseconds
    let toDay = timestamp => {
      let day = toDate(timestamp);
      day.setHours(0, 0, 0, 0);
      return day;
    };

    // Group photos by day and add them to collections object
    let collections = {};
    cameraRoll.map(crPhoto => {
      let day = toDay(crPhoto.node.timestamp);
      // collections are identified by a UTC-Day string
      collections[day] = cameraRoll.filter(photo => {
        return toDay(photo.node.timestamp).getTime() === day.getTime();
      });
    });

    this.setState({collections: collections});
  };
}

const cardImageSize = (count, margin) => (100 - margin * 2) / count;
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
  },
  cardButton: {},
});
