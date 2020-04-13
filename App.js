import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen} from './views/HomeScreen';
import {SwipeScreen} from './views/SwipeScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

Icon.loadFont();

const MainNavigator = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <MainNavigator.Navigator initialRouteName="Home">
        <MainNavigator.Screen name="Home" component={HomeScreen} />
        <MainNavigator.Screen name="Swipe" component={SwipeScreen} />
      </MainNavigator.Navigator>
    </NavigationContainer>
  );
};

export default App;
