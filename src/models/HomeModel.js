import CameraRoll from '@react-native-community/cameraroll';

export async function loadPhotos(count = 100) {
  let cameraRoll = await CameraRoll.getPhotos({first: count});
  return cameraRoll.edges;
}

export async function loadAlbums() {
  return await CameraRoll.getAlbums();
}

export async function createCollections(photos) {
  // Group photos by day and add them to collections object
  return photos.map(crPhoto => {
    let day = _toDay(crPhoto.node.timestamp);
    // collections are identified by a UTC-Day string
    return photos.filter(photo => {
      return _toDay(photo.node.timestamp).getTime() === day.getTime();
    });
  });
}

// A helper function to create a JavaScript Date from a timestamp
let _toDate = timestamp => new Date(timestamp * 1000);

// A helper function to create a JavaScript Date from a timestamp, omitting hours, minutes, seconds and miliseconds
let _toDay = timestamp => {
  let day = _toDate(timestamp);
  day.setHours(0, 0, 0, 0);
  return day;
};
