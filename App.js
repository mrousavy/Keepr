import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {StartScreen} from './views/StartScreen';
import {MainScreen} from './views/MainScreen';

const MainNavigator = createStackNavigator({
  Home: {screen: StartScreen},
  Main: {screen: MainScreen},
});

const App = createAppContainer(MainNavigator);

export default App;
