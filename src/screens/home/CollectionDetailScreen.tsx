import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from '../../styles/Colors';
import {
  loadPhotos,
  loadAlbums,
  createCollections,
} from '../../models/HomeModel';
import {BlurView} from '@react-native-community/blur';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Collection} from '../../models/HomeModel';

const STATUSBAR_HEIGHT = getStatusBarHeight();

export class CollectionDetailScreen extends React.Component<{}, {}> {
  render() {
    return (
      <View style={styles.home}>


        <BlurView
          blurType="light"
          blurAmount={10}
          style={styles.statusBarBlurView}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    flexDirection: 'column-reverse',
    backgroundColor: Colors.bg,
  },
  statusBarBlurView: {
    top: 0,
    height: STATUSBAR_HEIGHT,
    width: '100%',
    position: 'absolute',
  },
});
