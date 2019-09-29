import React from 'react';
import { Button, View, ScrollView, StyleSheet, Text } from 'react-native';

import List from './List';

import { connectActionSheet } from '@expo/react-native-action-sheet'

import WordContainer from '../containers/WordContainer';
import { Subscribe } from 'unstated'



class ListScreen extends React.Component {
  constructor(props) { 
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  componentDidMount() {
    this.props.word.loadingItems();
  }  

  onOpenActionSheet = () => {
    const options = ["Show all words"]
    const optionsFull = options.push(...this.props.word.state.allTags);

    this.props.showActionSheetWithOptions(
      { 
        options,
      },
      buttonIndex => {
        if (buttonIndex === 0){
          this.props.word.selectAllWords();
        }else{
          this.props.word.onTagPress(this.props.word.state.allTags[buttonIndex-1]);
        }
      },
    );
  };
  
  render() {
      const { word } = this.props

      let mergedTags = [];
      for (let i = 0; i < Object.values(this.props.word.state.allItems).length; i++) {
      mergedTags.push(...Object.values(this.props.word.state.allItems)[i].tags);
      }
      let filteredTags = mergedTags.filter(function(x, i, self) {
      return self.indexOf(x) === i;
      });
    
      return(
        <View>
        <Text style={styles.heading}>Word List</Text>

        <Button
          onPress={() => this.onOpenActionSheet()}
          color='white'
          title="Select a tag"
        />
        
        <ScrollView contentContainerStyle={styles.scrollableList}> 
          {Object.values(word.state.taggedItems) //allItems
          .reverse() // to add the new object of a to-do item when created at the end of the list
          .map(item => (
            <List
            key={item.id}
            wordIn={item.wordIn}
            wordOut={item.wordOut}
            {...item}
            deleteItem={word.deleteItem}
            completeItem={word.completeItem}
            incompleteItem={word.incompleteItem}
            />
          ))}
        </ScrollView>
        </View>        
      )
    }
}


const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 30,
  },

	scrollableList: {
		marginTop: 15
	},
});


// 1. Connect your component which uses showActionSheetWithOptions.
// 2. Wrap your top-level component with <ActionSheetProvider />  >>> App.js
const ConnectedListScreen = connectActionSheet(ListScreen)

// The methods in the container must be used inside <Subscribe>
const ListWrapper = () => (
  <Subscribe to={[WordContainer]}>
    {word => <ConnectedListScreen word={word} />}
  </Subscribe> 
)

export default ListWrapper