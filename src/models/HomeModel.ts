import CameraRoll, {
  PhotoIdentifier,
  PhotoIdentifiersPage,
  Album,
} from '@react-native-community/cameraroll';
import _ from 'lodash';
// import {getNamedSwatches, NamedSwatches} from 'react-native-palette';
// import {RGB, hexToRgb} from '../utils/Colors';

// const getNamedSwatchesAsync = async (uri: string): Promise<NamedSwatches> => {
//   return new Promise((resolve, reject) => {
//     getNamedSwatches(uri, (error, swatches) => {
//       if (error) reject(error);
//       else resolve(swatches);
//     });
//   });
// };

export interface Collection {
  id: number;
  name: string;
  // dominantColor: RGB,
  photos: PhotoIdentifier[];
}

export async function loadPhotos(count = 100) {
  return await CameraRoll.getPhotos({first: count});
}

export async function loadAlbums(): Promise<Album[]> {
  return await CameraRoll.getAlbums({});
}

export async function createCollections(
  photos: PhotoIdentifiersPage,
): Promise<Collection[]> {
  // Group photos by day and add them to collections object
  let groupedCollections = _.toPlainObject(
    _.groupBy(photos.edges, (photo) => _toDay(photo.node.timestamp)),
  );
  const collections: Collection[] = [];
  let idCounter = 0;

  Object.keys(groupedCollections).map(async (collectionName) => {
    let collectionPhotos = groupedCollections[
      collectionName
    ] as PhotoIdentifier[];
    // let {Vibrant} = await getNamedSwatchesAsync(photos[0].node.image.uri);
    // console.log(Vibrant);

    collections.push({
      id: idCounter++,
      name: collectionName,
      // dominantColor: hexToRgb(Vibrant.color),
      photos: collectionPhotos,
    });
  });
  return collections;
}

// A helper function to create a JavaScript Date from a timestamp
const _toDate = (timestamp: number) => new Date(timestamp * 1000);

// A helper function to create a JavaScript Date from a timestamp, omitting hours, minutes, seconds and miliseconds
const _toDay = (timestamp: number) => {
  let day = _toDate(timestamp);
  day.setHours(0, 0, 0, 0);
  return day;
};
