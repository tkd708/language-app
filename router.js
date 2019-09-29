import React from 'react';
import { Image } from 'react-native';
import { createAppContainer,　createBottomTabNavigator, createSwitchNavigator} from 'react-navigation';

import SplashScreen from './components/SplashScreen';
import AddWrapper from './components/AddScreen'; 
import ListWrapper from './components/ListScreen';


const NavigatorTab = createSwitchNavigator({
  splash: { screen: SplashScreen },
  main: { screen: MainTab = createBottomTabNavigator({
    AddStack: {
      screen: AddWrapper,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={{ height: 25, width: 25, tintColor: tintColor }}
            source={require('./assets/add.png')}
          />
        ),
        title: 'Add'
      }
    },
    ListStack: {
      screen: ListWrapper,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={{ height: 25, width: 25, tintColor: tintColor }}
            source={require('./assets/list.png')}
          />
        ),
        title: 'List'
      }
    }
  }, {
    swipeEnabled: false, // for Android
  })
  },
});

export const Navigator = createAppContainer(NavigatorTab);
