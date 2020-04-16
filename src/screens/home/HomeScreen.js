import React from 'react';
import {StyleSheet, Text, View, FlatList, SafeAreaView} from 'react-native';
import Colors from '../../styles/Colors';
import HomeModel from '../../models/HomeModel';
import CollectionCard from '../../components/CollectionCard';

export class HomeScreen extends React.Component {
  state = {
    collections: HomeModel.collections,
  };

  render() {
    return (
      <View style={styles.home}>
        <FlatList
          inverted
          extraData={false}
          ListEmptyComponent={
            <Text>There are no images in your Camera Roll</Text>
          }
          data={Object.entries(this.state.collections)}
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

  async componentDidMount() {
    await HomeModel.loadPhotos();
    await HomeModel.loadAlbums();
    await HomeModel.createCollections();
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
