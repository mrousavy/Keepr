import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {MainScreen} from './views/MainScreen';
import {StartScreen} from './views/StartScreen';

const MainNavigator = createStackNavigator({
  Start: {screen: StartScreen},
  Home: {screen: MainScreen},
});

const App = createAppContainer(MainNavigator);

export default App;
