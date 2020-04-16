import React from 'react';
import {TransitionPresets} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {HomeScreen} from './HomeScreen';
import {CollectionDetailScreen} from './CollectionDetailScreen';

export const iosTransitionSpec = {
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
        useNativeDriver: true,
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
      headerMode="none">
      <SharedElementStack.Screen name="HomeScreen" component={HomeScreen} />
      {/* <SharedElementStack.Screen
        name="CollectionDetailScreen"
        component={CollectionDetailScreen}
        sharedElementsConfig={(route, otherRoute, showing) => {
          const {item} = route.params;
          if (route.name === 'ItemDetailsScreen' && showing) {
            return [
              {
                id: `item.${item.id}.image`,
              },
              {
                id: `item.${item.id}.title`,
                animation: 'fade',
                resize: 'clip',
                align: 'left-top',
              },
              {
                id: `item.${item.id}.description`,
                animation: 'fade',
                resize: 'clip',
                align: 'left-top',
              },
            ];
          } else {
            return [
              {
                id: `item.${item.id}.image`,
              },
            ];
          }
        }}
      /> */}
    </SharedElementStack.Navigator>
  );
};
