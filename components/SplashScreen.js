import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, AsyncStorage, ActivityIndicator, Image } from 'react-native';
import { Button } from 'react-native-elements';

const SLIDES = [
    { title: 'STEP 1', text: 'Search a word and add tags', uri: require('../assets/slide1.jpg') },
    { title: 'STEP 2', text: 'Show words with the selected tag', uri: require('../assets/slide2.jpg') },
    { title: 'STEP 3', text: 'Manage your word list', uri: require('../assets/slide3.jpg') },
];

const { width } = Dimensions.get('window');

class SplashScreen extends React.Component {
    constructor(props) { 
        super(props);
        this.state = {
          isInitialized: null
        };
      }

  // waiting for getting data from AsyncStorage
  async componentDidMount() {
        let isInitializedString = AsyncStorage.getItem('isInitialized');
        if (isInitializedString === 'true') {
          this.setState({ isInitialized: true });      
          this.props.navigation.navigate('main'); //go to "main" screen
        } else {
          this.setState({ isInitialized: false });
        }
      }
  
  // The main screen was shown once >> initialize = true >> directly go to "main" screen onwards
  onStartButtonPress = async () => {
    await AsyncStorage.setItem('isInitialized', 'true');
    this.props.navigation.navigate('main'); //go to "main" screen
  }

  renderLastButton(index) {
    if (index === SLIDES.length - 1) { // The button will be shown only on the last slide
      return (
        <Button
          style={{ padding: 10 }}
          buttonStyle={{ backgroundColor: 'rgba(30,30,30,0.3)' }}
          title="Let's start learning!"
          onPress={this.onStartButtonPress}
        />
      );
    }
  }

  renderSlides() {
    return SLIDES.map((slide, index) => {  // slide={title, text}, index=0,1,2,...
      return (
        <View
          key={index}
          style={styles.slideStyle}
        >
          <View style={styles.containerStyle}>
            <Text style={styles.textStyle}>{slide.title}</Text>
            <Text style={styles.textStyle}>{slide.text}</Text>
          </View>

          <Image
            style={{ flex: 2 }}
            resizeMode="contain"
            source={slide.uri}
          />

          <View style={styles.containerStyle}>
            {this.renderLastButton(index)}
            <Text style={styles.textStyle}>{index + 1} / 3</Text>
          </View>
        </View>
      );
    });
  }

 render() {
    if (this.state.isInitialized === null) {
        return <ActivityIndicator size="large" />;
      }

   return (
    <ScrollView
    horizontal           // make direction of scroll horizontal
    pagingEnabled        // stop by slide
    style={{ flex: 1 }}  
    >
     {this.renderSlides()}  
    </ScrollView>
   );
 }

}

const styles = StyleSheet.create({
  slideStyle: {
    flex: 1,
    alignItems: 'center',
    width: width,
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    padding: 5
  }
});

export default SplashScreen;