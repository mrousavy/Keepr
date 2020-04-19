import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Home} from './screens/home/Home';
// import {Swipe} from './screens/swipe/Swipe';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Routes from './Routes';

Icon.loadFont();

const Stack = createStackNavigator();

export default class App extends React.PureComponent {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{gestureEnabled: false}}
          headerMode="none"
          initialRouteName={Routes.Home}>
          <Stack.Screen name={Routes.Home} component={Home} />
          {/* <Stack.Screen name="Swipe" component={Swipe} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
