import CameraRoll from '@react-native-community/cameraroll';

export let photos = {};
export let albums = {};
export let collections = {};

export let loadPhotos = async (count = 100) => {
  let cameraRoll = await CameraRoll.getPhotos({first: count});
  photos = cameraRoll.edges;
};

export let loadAlbums = async () => {
  albums = await CameraRoll.getAlbums();
};

export let createCollections = async () => {
  // Group photos by day and add them to collections object
  photos.map(crPhoto => {
    let day = _toDay(crPhoto.node.timestamp);
    // collections are identified by a UTC-Day string
    collections[day] = photos.filter(photo => {
      return _toDay(photo.node.timestamp).getTime() === day.getTime();
    });
  });
};

// A helper function to create a JavaScript Date from a timestamp
let _toDate = timestamp => new Date(timestamp * 1000);

// A helper function to create a JavaScript Date from a timestamp, omitting hours, minutes, seconds and miliseconds
let _toDay = timestamp => {
  let day = _toDate(timestamp);
  day.setHours(0, 0, 0, 0);
  return day;
};

export default {
  photos: photos,
  albums: albums,
  collections: collections,
  loadPhotos: loadPhotos,
  loadAlbums: loadAlbums,
  createCollections: createCollections,
};
