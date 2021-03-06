import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Home} from './screens/home/Home';
// import {Swipe} from './screens/swipe/Swipe';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Routes, RouteParams} from './Routes';
import {Swipe} from './screens/swipe/Swipe';

Icon.loadFont();

const Stack = createStackNavigator<RouteParams>();

export default class App extends React.PureComponent {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{gestureEnabled: false}}
          headerMode="none"
          initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Swipe" component={Swipe} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
