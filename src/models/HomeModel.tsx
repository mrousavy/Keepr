import CameraRoll, { PhotoIdentifier, PhotoIdentifiersPage, Album } from '@react-native-community/cameraroll';
import _ from 'lodash';

export type Collection = {
  name: string,
  photos: PhotoIdentifier[],
}

export async function loadPhotos(count = 100) {
  return await CameraRoll.getPhotos({first: count});
}

export async function loadAlbums() : Promise<Album[]> {
  return await CameraRoll.getAlbums({});
}

export async function createCollections(photos: PhotoIdentifiersPage) : Promise<Collection[]> {
  // Group photos by day and add them to collections object

  return _.toPlainObject(_.groupBy(photos.edges, photo => _toDay(photo.node.timestamp)));
}

// A helper function to create a JavaScript Date from a timestamp
let _toDate = (timestamp: number) => new Date(timestamp * 1000);

// A helper function to create a JavaScript Date from a timestamp, omitting hours, minutes, seconds and miliseconds
let _toDay = (timestamp: number) => {
  let day = _toDate(timestamp);
  day.setHours(0, 0, 0, 0);
  return day;
};
