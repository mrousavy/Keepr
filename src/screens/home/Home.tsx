import React from 'react';
import {TransitionPresets} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {HomeScreen} from './HomeScreen';
import Routes from '../../Routes';
import { CollectionDetailScreen } from './CollectionDetailScreen';
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';

export const iosTransitionSpec: TransitionSpec = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10,
  },
};

const SharedElementStack = createSharedElementStackNavigator();
export const Home = () => {
  return (
    <SharedElementStack.Navigator
      mode="modal"
      screenOptions={{
        gestureEnabled: false,
        // gestureResponseDistance: {
        // 	vertical: 100,
        // },
        // gestureDirection: 'vertical',

        // cardOverlayEnabled: true,
        ...TransitionPresets.ModalSlideFromBottomIOS,
        transitionSpec: {
          open: iosTransitionSpec,
          close: iosTransitionSpec,
        },
        cardStyleInterpolator: ({current: {progress}}) => ({
          cardStyle: {
            opacity: progress,
          },
        }),
      }}
      headerMode="none"
      initialRouteName={Routes.Home}>
      <SharedElementStack.Screen name={Routes.Home} component={HomeScreen} />
      <SharedElementStack.Screen
        name={Routes.CollectionDetail}
        component={CollectionDetailScreen}
        sharedElementsConfig={(route, otherRoute, showing) => {
          console.log('navigating shared element with params', route.params);
          const {collection} = route.params;
          // if (route.name === 'CollectionDetailScreen' && showing) {
          return [
            {
              id: `collection.${collection.id}.image`,
            },
            {
              id: `collection.${collection.id}.title`,
              animation: 'fade',
              resize: 'clip',
              align: 'left-top',
            },
            {
              id: `collection.${collection.id}.description`,
              animation: 'fade',
              resize: 'clip',
              align: 'left-top',
            },
          ];
          // } else {
          //   return [
          //     {
          //       id: `item.${item.id}.image`,
          //     },
          //   ];
          // }
        }}
      />
    </SharedElementStack.Navigator>
  );
};
