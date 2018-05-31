/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  StatusBar,
  Text,
  TouchableNativeFeedback,
  Alert,
  Image,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  BackHandler
} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import BookView from './BookView.js'
import BookDetail from './BookDetail.js'
import BooksByGenre from './BooksByGenre.js'
import BookViewSmall from './BookViewSmall.js'
import HomePage from './HomePage.js'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const styles = require('./Styles.js')
const colors = require('./Colors.js')
const h = Dimensions.get('window').height
const w = Dimensions.get('window').width
var booksDB = require('./books.json')

type Props = {};




export default class GenreBooks extends Component<Props> {

  state={
    view:'Home',
    isLoading: true
  }

  componentDidMount(){
    setTimeout(
      () => { this.setState({isLoading: false})},
      1000
    );

    BackHandler.addEventListener('hardwareBackPress', ()=>{

        this.setState({view: 'HomePage'})
        return true
    });
  }
  returnBooks = () => {
    var books = [];
    for(let i = 0; i<booksDB.length; i++){
      if(booksDB[i].genre==this.props.genre)
      books.push(<BookViewSmall key={i} name={booksDB[i].title} imageURL={booksDB[i].imUrl} price={booksDB[i].price} onClick={()=>this.setState({view:'BookDetail', book: {'title': booksDB[i].title, 'price': booksDB[i].price, 'imageURL': booksDB[i].imUrl, 'genre': booksDB[i].genre, 'description': booksDB[i].description, 'asin': booksDB[i].asin}})}/>)
    }
    
    return books;

  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{height: h, width: w, alignItems: 'center', justifyContent: 'center'}}>
         <StatusBar
                    backgroundColor={colors.statusBar}
                    barStyle="dark-content"
                  />
          <ActivityIndicator size="large" color={colors.tint} />
        </View>
      )
    }
    else{
      switch(this.state.view){
        case 'Home':
          return (
            <View style={styles.container}>
              <StatusBar
                    backgroundColor={colors.statusBar}
                    barStyle="dark-content"
                  />
              <View style={{height: 56, width: w, backgroundColor: 'white'}}>
                <TouchableNativeFeedback onPress={()=>this.setState({view: 'HomePage'})}>
                      <View style={{height: 56, width: 56, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center'}}>
                        <Image style={styles.actionBI} source={require('./icons/back.png')}/>
                      </View>
               </TouchableNativeFeedback>
              </View>
              <Text style={styles.type}>
                  {this.props.genre + ' Books'} 
              </Text>
              <ScrollView>
              {this.returnBooks()}
              </ScrollView>
              
            </View>

          );
        case 'BookDetail':
          return <BookDetail book={this.state.book} from={'GenreBooks'} genre={this.props.genre}/>
        case 'HomePage':
          return <HomePage/>
      }
    }
  }

}


