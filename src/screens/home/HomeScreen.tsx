import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Colors from '../../styles/Colors';
import {
  loadPhotos,
  loadAlbums,
  createCollections,
} from '../../models/HomeModel';
import CollectionCard from '../../components/CollectionCard';
import {BlurView} from '@react-native-community/blur';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Collection} from '../../models/HomeModel';

const STATUSBAR_HEIGHT = getStatusBarHeight();

// type Props = {
//   navigation: ProfileScreenNavigationProp;
// };

type State = {
  collections: Collection[];
};

export class HomeScreen extends React.Component<{}, State> {
  state = {
    collections: [],
  };

  render() {
    return (
      <View style={styles.home}>
        <FlatList
          style={styles.cardList}
          contentContainerStyle={styles.cardListContent}
          inverted
          extraData={false}
          ListEmptyComponent={
            <Text>There are no images in your Camera Roll</Text>
          }
          keyExtractor={(item, index) => {
            return `collection${index}`;
          }}
          data={this.state.collections}
          renderItem={({item}) => (
            <CollectionCard
              collection={item}
              onPress={() => this._onSelectCollection(item[0])}
            />
          )}
        />
        <BlurView
          blurType="light"
          blurAmount={10}
          style={styles.statusBarBlurView}
        />
      </View>
    );
  }

  componentDidMount() {
    this.load();
  }

  async load() {
    const photos = await loadPhotos();
    const albums = await loadAlbums();
    const collections = await createCollections(photos);
    this.setState({
      collections: collections,
    });
  }

  _onSelectCollection = (key: any) => {
    this.props.navigation.navigate('Swipe', {
      collection: this.state.collections[key],
      collectionId: key,
    });
  };
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    flexDirection: 'column-reverse',
    backgroundColor: Colors.bg,
  },
  cardList: {
    // marginBottom: 20,
  },
  cardListContent: {
    paddingVertical: STATUSBAR_HEIGHT,
  },
  statusBarBlurView: {
    top: 0,
    height: STATUSBAR_HEIGHT,
    width: '100%',
    position: 'absolute',
  },
});
