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
import CameraRoll from '@react-native-community/cameraroll';
import Colors from '../styles/Colors';

export class HomeScreen extends React.Component {
  state = {
    photoshoots: [],
  };

  render() {
    const photoshoots = this.state.photoshoots;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.cardContainer}>
          <FlatList
            inverted
            extraData={false}
            ListEmptyComponent={
              <Text>There are no images in your Camera Roll</Text>
            }
            data={Object.entries(photoshoots)}
            renderItem={({item}) => {
              const key = item[0];
              const photoshoot = item[1];

              return (
                <View style={styles.card} key={key}>
                  <Text style={styles.cardTitle}>
                    {'Photoshoot at ' +
                      new Date(key).toLocaleDateString('de-AT')}
                  </Text>
                  <View style={styles.cardImageContainer}>
                    {photoshoot.slice(0, 6).map((photo, photoId) => {
                      const visiblePhotos = 5;

                      if (photoId < visiblePhotos) {
                        return (
                          <Image
                            key={photoId}
                            style={styles.cardImage}
                            source={{uri: photo.node.image.uri}}
                          />
                        );
                      } else if (photoId === visiblePhotos) {
                        return (
                          <Text
                            key={'more'}
                            style={[styles.cardImage, styles.cardMoreButton]}>
                            {`+${photoshoot.length - visiblePhotos} more`}
                          </Text>
                        );
                      }
                    })}
                  </View>
                  <Button
                    title="Go to Collection"
                    style={styles.cardButton}
                    onPress={this._onSelectCollection}
                  />
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
    console.log(`Selected collection "${key}"`);
  };

  loadPhotos = async () => {
    let {edges: cameraRoll} = await CameraRoll.getPhotos({first: 50});
    let albums = await CameraRoll.getAlbums();
    console.log(albums);

    // A helper function to create a JavaScript Date from a timestamp
    let toDate = timestamp => new Date(timestamp * 1000);
    // A helper function to create a JavaScript Date from a timestamp, omitting hours, minutes, seconds and miliseconds
    let toDay = timestamp => {
      let day = toDate(timestamp);
      day.setHours(0, 0, 0, 0);
      return day;
    };

    // Group photos by day and add them to photoshoots object
    let photoshoots = {};
    cameraRoll.map(crPhoto => {
      let day = toDay(crPhoto.node.timestamp);
      // Photoshoots are identified by a UTC-Day string
      photoshoots[day] = cameraRoll.filter(photo => {
        return toDay(photo.node.timestamp).getTime() === day.getTime();
      });
    });

    this.setState({photoshoots: photoshoots});
  };
}

const cardImageSize = (count, margin) => (100 - count * margin * 2) / count;
const cardImageMargin = 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  smallText: {
    fontSize: 10,
    color: 'rgb(150,150,150)',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  card: {
    flexDirection: 'column',
    marginHorizontal: 10,
    marginTop: 10,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    backgroundColor: Colors.bgDark,
  },
  cardTitle: {
    height: 20,
    fontSize: 20,
  },
  cardImageContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // maxHeight: `${100 - 12}%`,
    paddingVertical: 10,
  },
  cardImage: {
    flexGrow: 1,
    flexShrink: 1,
    // Maximum 3 items per row
    width: cardImageSize(3, cardImageMargin) + '%',
    height: 0,
    aspectRatio: 1,
    margin: cardImageMargin,
    borderRadius: 2,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  cardMoreButton: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: Colors.bgDarker,
    overflow: 'hidden',
  },
  cardButton: {
    textAlign: 'right',
  },
});
