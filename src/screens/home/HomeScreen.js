import React from 'react';
import {StyleSheet, Text, View, FlatList, SafeAreaView} from 'react-native';
import Colors from '../../styles/Colors';
import {
  loadPhotos,
  loadAlbums,
  createCollections,
} from '../../models/HomeModel';
import CollectionCard from '../../components/CollectionCard';

export class HomeScreen extends React.Component {
  state = {
    collections: [],
  };

  async render() {
    return (
      <View style={styles.home}>
        <FlatList
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
              item={item}
              onPress={() => this._onSelectCollection(item[0])}
            />
          )}
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

  _onSelectCollection = key => {
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
});
