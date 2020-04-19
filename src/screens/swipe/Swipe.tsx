import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SwipeScreen} from './SwipeScreen';
import {RouteParams} from '../../Routes';
import {HomeScreen} from '../home/HomeScreen';

const SharedElementStack = createStackNavigator<RouteParams>();
export const Swipe = () => {
  return (
    <SharedElementStack.Navigator mode="modal" headerMode="none">
      <SharedElementStack.Screen name="Home" component={HomeScreen} />
      <SharedElementStack.Screen name="Swipe" component={SwipeScreen} />
    </SharedElementStack.Navigator>
  );
};
