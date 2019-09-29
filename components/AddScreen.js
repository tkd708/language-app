import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Picker, TouchableOpacity } from 'react-native';
import axios from 'axios';

import WordContainer from '../containers/WordContainer';
import { Subscribe } from 'unstated'

import Languages from '../utils/languages.json';
const API_KEY = "Your API_KEY";

const { width } = Dimensions.get('window');

class AddScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        URL:'',
        langFrom: "en",
        langTo: "fr",
        inputText: "",
        convertedText: "",
        outputText: "",
        tag: "",
        tags: [],
        submit: false,
    };
  }

  componentDidMount() {
    this.props.word.loadingItems();
  }

  onTranslate(){
    const URL = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}&source=${this.state.langFrom}&target=${this.state.langTo}&q=${this.state.convertedText}&format=text`;    
    axios.get(URL)
    .then(res => {
      this.setState({ outputText: res.data.data.translations[0].translatedText });
      return
  }).catch(err => {
      console.log('err:', err);
      return
  })
  }

  onAddTag = (tag) => {
    if (tag !== '' && this.state.tags.indexOf(tag) == -1) {
      this.state.tags.push(tag);
      this.setState({tag: ''});
    }
  }

  onAddItem = (input, output, tags) => {
    if (output !== '') {
      this.props.word.onDoneAddItem(input, output, tags)
      this.setState({
        inputText: '',
        outputText: '',
        tags: [],
      });
    }
  }

  render() {
    const { word } = this.props
  
  return (
          <View style={{ flex: 1, flexDirection: 'column'}}>          

          <Text style={styles.heading}>Search New Word</Text>
                    
          <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>   
            <View> 
            <Text style={styles.text}>From</Text>
            <Picker
            style={styles.picker}
            itemStyle={{height: 100}}
            selectedValue={this.state.langFrom}
            onValueChange={ lang => this.setState({langFrom: lang})}
            >
              {Object.keys(Languages).map((key, index) => (
                  <Picker.Item label={Languages[key]} value={key} key={index} />
              ))}
            </Picker>
            </View>

            <View>
            <TextInput
                  style={styles.input}
                  placeholder="Enter text"
                  underlineColorAndroid="transparent"
                  onChangeText = {text => this.setState({
                    inputText: text,
                    convertedText: encodeURI(text)
                  })}
                  value={this.state.inputText}
            />
            </View>
          </View>

          <TouchableOpacity
              style = {styles.translateButton}
              onPress = {() => this.onTranslate()}
          >
              <Text style = {styles.text}> Translate </Text>
          </TouchableOpacity>


          <View style={{ flex: 1, flexDirection: 'row' }}>          
            <View>
            <Text style={styles.text}>To</Text>
            <Picker
            style={styles.picker}
            itemStyle={{height: 100}}
            selectedValue={this.state.langTo}
            onValueChange={ lang => this.setState({langTo: lang})}
            >
              {Object.keys(Languages).map((key, index) => (
                  <Picker.Item label={Languages[key]} value={key} key={index} />
              ))}
            </Picker>
            </View>
          
            <View style={styles.outputContainer}>
            <Text style={styles.outputText}> {this.state.outputText} </Text>
            </View>
         </View>
          
        <View style={{ flex: 1, flexDirection: 'row', marginTop: 30, }}>          
          <Picker
            style={styles.picker}
            itemStyle={{height: 80}}
            selectedValue={this.state.tag}
            onValueChange={ selectedTag => this.setState({tag: selectedTag})}
            >
           <Picker.Item label="Select a tag" value="" />
           {Object.values(word.state.allTags)
            .map((item, index) => (
              <Picker.Item label={item} value={item} key={index} />
            )
           )}
          </Picker>

          <TextInput
                  style={styles.newTag}
                  placeholder="or enter a new tag"
                  underlineColorAndroid="transparent"
                  onChangeText = {tag => this.setState({tag})}
                  value={this.state.tag}
          />
          
         <TouchableOpacity
              style = {styles.addTagButton}
              onPress = {() => this.onAddTag(this.state.tag)}
          >
              <Text style = {styles.text}>Add</Text>
          </TouchableOpacity>

        </View>


          <TouchableOpacity
              style = {styles.addListButton}
              onPress = {() => this.onAddItem(this.state.inputText, this.state.outputText, this.state.tags)}
          >
              <Text style = {styles.text}> Add to list </Text>
          </TouchableOpacity>

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

  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    },

  picker: {
    height: 100,
    width: 120,
    margin: 5,
  },

  input: {
    height: 100,
    width: width*0.6,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#fff',
    borderWidth: .5,
    borderColor: '#000',
    borderRadius: 5 ,
    margin: 5
  },

  outputContainer: {
    height: 100,
    width: width*0.6,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: .5,
    borderColor: '#000',
    borderRadius: 5 ,
    margin: 5
  },

  outputText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
  },
  
  translateButton: {
    backgroundColor: 'rgba(30,30,30,0.3)',
    padding: 10,
    marginVertical: 15,
    marginHorizontal: 100,
    borderRadius: 5 ,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',  
  },

  newTag: {
    marginVertical: 25,
    height: 40,
    width: width*0.45,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#fff',
    borderWidth: .5,
    borderColor: '#000',
    borderRadius: 5 ,
    margin: 5
  },

  addTagButton: {
    backgroundColor: 'rgba(30,30,30,0.3)',
    padding: 5,
    borderRadius: 5 ,
    marginVertical: 25,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  addListButton: {
    backgroundColor: 'rgba(30,30,30,0.3)',
    padding: 10,
    marginVertical: 30,
    marginHorizontal: 70,
    borderRadius: 5 ,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',  
  },

});

// The methods in the container must be used inside <Subscribe>
const AddWrapper = () => (
  <Subscribe to={[WordContainer]}>
    {word => <AddScreen word={word} />}
  </Subscribe> 
)
export default AddWrapper
