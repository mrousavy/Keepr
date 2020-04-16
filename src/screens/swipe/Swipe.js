import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SwipeScreen} from './SwipeScreen';

const SharedElementStack = createStackNavigator();
export const Swipe = () => {
  return (
    <SharedElementStack.Navigator mode="modal" headerMode="none">
      <SharedElementStack.Screen name="SwipeScreen" component={SwipeScreen} />
    </SharedElementStack.Navigator>
  );
};
