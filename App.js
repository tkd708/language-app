import React from 'react';
import { Navigator } from './router';
import { Provider} from 'unstated'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { LinearGradient } from 'expo-linear-gradient';

//LinearGradient can be applied to all the pages by wapping the navigator
//ActionSheetProvider should wrap all the toplevel component
//Provider must wrap all the components to have share the states
export default class App extends React.Component {
  render() {
    return (
      <Provider>
        <ActionSheetProvider>
          <LinearGradient colors={['#1E90FF', 'white', '#FF4F50']} style={{ flex: 1}}>
            <Navigator /> 
          </LinearGradient>
        </ActionSheetProvider>
      </Provider>
    );
  }
}


