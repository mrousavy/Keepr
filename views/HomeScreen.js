import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  Button,
  FlatList,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';

export class HomeScreen extends React.Component {
  state = {
    photoshoots: [],
  };
  static navigationOptions = {
    headerShown: false,
  };
  scrollView = React.createRef();

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
                    {photoshoot.map((photo, photoId) => {
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
                            style={styles.cardImage}>{`+${photoshoot.length -
                            visiblePhotos} more`}</Text>
                        );
                      }
                    })}
                  </View>
                  <Button
                    title="Go to Collection"
                    style={styles.cardButton}
                    onPress={this._onSelectColletion}
                  />
                </View>
              );
            }}
          />
        </View>
        <Text style={styles.smallText}>an app by mrousavy.</Text>
      </SafeAreaView>
    );
  }

  componentDidMount() {
    this.loadPhotos();
  }

  _onSelectColletion = key => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: '#DEDEDE',
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
    backgroundColor: '#DEDEDE',
    paddingVertical: 10,
  },
  cardImage: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: `${(100 - 12) / 3}%`,
    height: 100,
    margin: 2,
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  cardButton: {
    textAlign: 'right',
  },
});
