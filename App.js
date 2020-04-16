import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Home} from './views/home/Home';
import {Swipe} from './views/swipe/Swipe';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

Icon.loadFont();

const Stack = createStackNavigator();

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
