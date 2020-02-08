import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {PickImagesScreen} from './views/PickImagesScreen';
import {SwipeScreen} from './views/SwipeScreen';

const MainNavigator = createStackNavigator({
    PickImages: {screen: PickImagesScreen},
    Swipe: {screen: SwipeScreen},
  },
  {
    initialRouteName: "Swipe",
    initialRouteParams: {images: []},
    defaultNavigationOptions: {
      gestureEnabled: false
    }
  });

const App = createAppContainer(MainNavigator);

export default App;
