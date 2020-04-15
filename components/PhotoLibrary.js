import CameraRoll from '@react-native-community/cameraroll';

class PhotoLibrary {
  constructor() {
    this.photos = {};
    this.albums = {};
    this.collections = {};
  }

  async loadPhotos(count = 100) {
    let photos = await CameraRoll.getPhotos({first: count});
    this.photos = photos.edges;
  }

  async loadAlbums() {
    this.albums = await CameraRoll.getAlbums();
  }

  async createCollections() {
    // Group photos by day and add them to collections object
    let collections = {};
    this.photos.map(crPhoto => {
      let day = this._toDay(crPhoto.node.timestamp);
      // collections are identified by a UTC-Day string
      collections[day] = this.photos.filter(photo => {
        return this._toDay(photo.node.timestamp).getTime() === day.getTime();
      });
    });

    this.collections = collections;
  }

  // A helper function to create a JavaScript Date from a timestamp
  _toDate = timestamp => new Date(timestamp * 1000);

  // A helper function to create a JavaScript Date from a timestamp, omitting hours, minutes, seconds and miliseconds
  _toDay = timestamp => {
    let day = this.toDate(timestamp);
    day.setHours(0, 0, 0, 0);
    return day;
  };
}

export default PhotoLibrary;
