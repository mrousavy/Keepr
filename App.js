import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {PickImagesScreen} from './views/PickImagesScreen';
import {SwipeScreen} from './views/SwipeScreen';

const MainNavigator = createStackNavigator({
    PickImages: {screen: PickImagesScreen},
    Swipe: {screen: SwipeScreen},
  },
  {
    initialRouteName: "PickImages",
    // initialRouteParams: {images: [{"height": 2848, "mime": "image/jpeg", "uri": "/Users/mrousavy/Library/Developer/CoreSimulator/Devices/20752FBC-3424-4462-B44F-73541CB46F9B/data/Containers/Data/Application/4659D401-00A8-47E6-A907-B4A6C7DB9450/tmp/react-native-customized-image-picker/47778928-C69B-4433-9E45-0B43EAA4D78F.jpg", "width": 4288}, {"height": 2002, "mime": "image/jpeg", "uri": "/Users/mrousavy/Library/Developer/CoreSimulator/Devices/20752FBC-3424-4462-B44F-73541CB46F9B/data/Containers/Data/Application/4659D401-00A8-47E6-A907-B4A6C7DB9450/tmp/react-native-customized-image-picker/5A690AA0-F34A-4B58-9038-6B2E898CE71E.jpg", "width": 3000}, {"height": 2500, "mime": "image/jpeg", "uri": "/Users/mrousavy/Library/Developer/CoreSimulator/Devices/20752FBC-3424-4462-B44F-73541CB46F9B/data/Containers/Data/Application/4659D401-00A8-47E6-A907-B4A6C7DB9450/tmp/react-native-customized-image-picker/7A5FEDDA-D538-4857-B9C4-767A553179DE.jpg", "width": 1668}, {"height": 2848, "mime": "image/jpeg", "uri": "/Users/mrousavy/Library/Developer/CoreSimulator/Devices/20752FBC-3424-4462-B44F-73541CB46F9B/data/Containers/Data/Application/4659D401-00A8-47E6-A907-B4A6C7DB9450/tmp/react-native-customized-image-picker/77590DEA-A814-4F84-BAE7-3072E90514B3.jpg", "width": 4288}, {"height": 2002, "mime": "image/jpeg", "uri": "/Users/mrousavy/Library/Developer/CoreSimulator/Devices/20752FBC-3424-4462-B44F-73541CB46F9B/data/Containers/Data/Application/4659D401-00A8-47E6-A907-B4A6C7DB9450/tmp/react-native-customized-image-picker/31F1B09C-D274-4533-8E9D-DD0583F22E83.jpg", "width": 3000}, {"height": 3024, "mime": "image/jpeg", "uri": "/Users/mrousavy/Library/Developer/CoreSimulator/Devices/20752FBC-3424-4462-B44F-73541CB46F9B/data/Containers/Data/Application/4659D401-00A8-47E6-A907-B4A6C7DB9450/tmp/react-native-customized-image-picker/F5C7986C-1A4C-4816-B6F3-1951CC871117.jpg", "width": 4032}]},
    // defaultNavigationOptions: {
    //   gestureEnabled: false
    // }
  });

const App = createAppContainer(MainNavigator);

export default App;
