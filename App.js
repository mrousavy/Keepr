import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {PickImagesScreen} from './views/PickImagesScreen';
import {SwipeScreen} from './views/SwipeScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

Icon.loadFont();

const MainNavigator = createStackNavigator(
  {
    PickImages: {screen: PickImagesScreen},
    Swipe: {screen: SwipeScreen},
  },
  {
    initialRouteName: 'Swipe',
    initialRouteParams: {
      images: [
        {
          height: 2500,
          mime: 'image/jpeg',
          uri:
            '/Users/mrousavy/Library/Developer/CoreSimulator/Devices/20752FBC-3424-4462-B44F-73541CB46F9B/data/Containers/Data/Application/70A540A8-2CE3-4C97-A874-D9E6865758A6/tmp/react-native-customized-image-picker/69334B89-6256-4385-8758-D0A1E5EDDE32.jpg',
          width: 1668,
        },
        {
          height: 2848,
          mime: 'image/jpeg',
          uri:
            '/Users/mrousavy/Library/Developer/CoreSimulator/Devices/20752FBC-3424-4462-B44F-73541CB46F9B/data/Containers/Data/Application/70A540A8-2CE3-4C97-A874-D9E6865758A6/tmp/react-native-customized-image-picker/EB1737EC-C99B-46C8-949C-86E72C94653F.jpg',
          width: 4288,
        },
        {
          height: 2002,
          mime: 'image/jpeg',
          uri:
            '/Users/mrousavy/Library/Developer/CoreSimulator/Devices/20752FBC-3424-4462-B44F-73541CB46F9B/data/Containers/Data/Application/70A540A8-2CE3-4C97-A874-D9E6865758A6/tmp/react-native-customized-image-picker/A7A8714D-770A-4EAF-8154-B256E254CC21.jpg',
          width: 3000,
        },
        {
          height: 2848,
          mime: 'image/jpeg',
          uri:
            '/Users/mrousavy/Library/Developer/CoreSimulator/Devices/20752FBC-3424-4462-B44F-73541CB46F9B/data/Containers/Data/Application/70A540A8-2CE3-4C97-A874-D9E6865758A6/tmp/react-native-customized-image-picker/0F3BECF3-EE2A-4F5E-9E46-0CC138A86D83.jpg',
          width: 4288,
        },
        {
          height: 2002,
          mime: 'image/jpeg',
          uri:
            '/Users/mrousavy/Library/Developer/CoreSimulator/Devices/20752FBC-3424-4462-B44F-73541CB46F9B/data/Containers/Data/Application/70A540A8-2CE3-4C97-A874-D9E6865758A6/tmp/react-native-customized-image-picker/A3A80812-72F1-463D-A45B-AA4ADA6FD381.jpg',
          width: 3000,
        },
        {
          height: 3024,
          mime: 'image/jpeg',
          uri:
            '/Users/mrousavy/Library/Developer/CoreSimulator/Devices/20752FBC-3424-4462-B44F-73541CB46F9B/data/Containers/Data/Application/70A540A8-2CE3-4C97-A874-D9E6865758A6/tmp/react-native-customized-image-picker/AAF260ED-5449-4343-8E94-C2D937D26984.jpg',
          width: 4032,
        },
      ],
    },
    defaultNavigationOptions: {
      gestureEnabled: false,
    },
  },
);

const App = createAppContainer(MainNavigator);

export default App;
