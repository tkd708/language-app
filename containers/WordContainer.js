import { AsyncStorage } from 'react-native';
import uuid from 'uuid';
import { Container } from 'unstated' // Container... store & actions


export default class WordContainer extends Container {
  constructor(props) { 
        super(props);
        this.state = {
          loadingItems: false,
          allItems: [],
          allTags: [],
          taggedItems: [],
          isCompleted: false,    
        };
  }
  
  onDoneAddItem = (input, output, tags) => {
    if (output !== '') {
      this.setState(prevState => {
        const id = uuid(); // create a new ID using uuid  
        const newItemObject = { // create an object called newItemObject which uses the ID as a variable for the name.
          [id]: {
            id,
            isCompleted: false,
            wordIn: input,
            wordOut: output,
            tags: tags,
            createdAt: Date.now()
          }
        };
        // create a new object called newState which uses the prevState object, clears the TextInput for newInputValue 
        // and finally adds our newItemObject at the end of the other to do items list.
        const newState = {
          ...prevState,
          allItems: {
            ...prevState.allItems,
            ...newItemObject
          },
          taggedItems: {
            ...prevState.taggedItems,
            ...newItemObject
          }
        };
        this.saveItems(newState.allItems);
        return { ...newState };
      });
    }
  };

  saveItems = newItems => {
    const saveItem = AsyncStorage.setItem('Words', JSON.stringify(newItems));

    let mergedTags = [];
    for (let i = 0; i < Object.values(newItems).length; i++) {
    mergedTags.push(...Object.values(newItems)[i].tags);
    }
    let filteredTags = mergedTags.filter(function(x, i, self) {
    return self.indexOf(x) === i;
    });
    this.setState({
      allTags: filteredTags
    });
  };

  loadingItems = async () => {
    try {
      const loadedItems = await AsyncStorage.getItem('Words');
      const allItems = JSON.parse(loadedItems)
      let mergedTags = [];
      for (let i = 0; i < Object.values(allItems).length; i++) {
        mergedTags.push(...Object.values(allItems)[i].tags);
      }
      let filteredTags = mergedTags.filter(function(x, i, self) {
      return self.indexOf(x) === i;
      });
      this.setState({
        loadingItems: true,
        allItems: allItems || {},
        taggedItems: allItems || {},
        allTags: filteredTags
      });
    } catch (err) {
      console.log(err);
    }
  };

  onTagPress = (selectedTag) => {
    let wordsWithTag = {};
    for (let i = 0; i < Object.values(this.state.allItems).length; i++) {
      if (Object(Object.values(this.state.allItems)[i]).tags.indexOf(selectedTag) >= 0 ) {
        //wordsWithTag.push(Object.values(this.state.allItems)[i]);
        let id = (Object.values(this.state.allItems)[i]).id;
        let content = Object.values(this.state.allItems)[i];
        var word = { [id]: content };
        let wordsWithTag = {...wordsWithTag, ...word};
        this.setState({
          taggedItems: wordsWithTag,
        });
      }
    }
  }  

  selectAllWords = () => {
    this.setState({
      taggedItems: this.state.allItems,
    });
  }

    // this is further passed as a prop to our List component as deleteItem={this.deleteItem}.
    // adding the id of an individual to do item since we are going to use this id to delete the item from the list.
    deleteItem = id => {
      this.setState(prevState => {
        const allItems = prevState.allItems;
        delete allItems[id];
        const taggedItems = prevState.taggedItems;
        delete taggedItems[id];
        const newState = {
          ...prevState,
          ...allItems,
          ...taggedItems
        };
        this.saveItems(newState.allItems);
        return { ...newState };
      });
    };
  
    completeItem = id => {
      this.setState(prevState => {
        const newState = {
          ...prevState,
          allItems: {
            ...prevState.allItems,
            [id]: {
              ...prevState.allItems[id],
              isCompleted: true
            }
          },
          taggedItems: {
            ...prevState.taggedItems,
            [id]: {
              ...prevState.taggedItems[id],
              isCompleted: true
            }
          }
        };
        this.saveItems(newState.allItems);
        return { ...newState };
      });
    };
  
    incompleteItem = id => {
      this.setState(prevState => {
        const newState = {
          ...prevState,
          allItems: {
            ...prevState.allItems,
            [id]: {
              ...prevState.allItems[id],
              isCompleted: false
            }
          },
          taggedItems: {
            ...prevState.taggedItems,
            [id]: {
              ...prevState.taggedItems[id],
              isCompleted: false
            }
          }
        };
        this.saveItems(newState.allItems);
        return { ...newState };
      });
    };
  
    deleteAllItems = async () => {
      try {
        await AsyncStorage.removeItem('Words');
        this.setState({ 
          allItems: {},
          taggedItems: {}
        });
      } catch (err) {
        console.log(err);
      }
    };

};

