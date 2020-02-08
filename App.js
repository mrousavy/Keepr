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
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  });

const App = createAppContainer(MainNavigator);

export default App;
