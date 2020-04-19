import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SwipeScreen} from './SwipeScreen';
import {RouteParams} from '../../Routes';
import {Home} from '../home/Home';

const SharedElementStack = createStackNavigator<RouteParams>();
export const Swipe = () => {
  return (
    <SharedElementStack.Navigator mode="modal" headerMode="none">
      <SharedElementStack.Screen name="Home" component={Home} />
      <SharedElementStack.Screen name="Swipe" component={SwipeScreen} />
    </SharedElementStack.Navigator>
  );
};
