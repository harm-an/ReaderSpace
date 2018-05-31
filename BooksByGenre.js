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
  ActivityIndicator
} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import BookView from './BookView.js'
import BookDetail from './BookDetail.js'
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




export default class BooksByGenre extends Component<Props> {

  state={
    view:'Home',
    isLoading: true
  }

  componentDidMount(){
    setTimeout(
      () => { this.setState({isLoading: false})},
      500
    );
  }

  returnBooks = () => {
    var books = [];
    var count = 0;
    for(let i = 0; i<booksDB.length; i++){
      if(booksDB[i].genre===this.props.genre && count<6 && booksDB[i].imUrl.length!=0){
        books.push(<BookView key={i} name={booksDB[i].title} imageURL={booksDB[i].imUrl} price={booksDB[i].price} onClick={this.props.onClick.bind(this,{'title': booksDB[i].title, 'price': booksDB[i].price, 'imageURL': booksDB[i].imUrl, 'genre': booksDB[i].genre, 'description': booksDB[i].description, 'asin': booksDB[i].asin})}/>)
        count++
      }
    }
    
    return books;

  }

  render() {
    if(!this.state.isLoading)
      return (
          <ScrollView horizontal={true}>
              {this.returnBooks()}

              <View style={{backgroundColor: 'transparent', height: 16+195+8, width: 100, marginRight: 24, marginLeft: 16}}>
                <View style={{height: 24, width: '100%', backgroundColor: 'white'}}/>
                <View style={{height: 195, width: '100%', backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center'}}>
                  <TouchableNativeFeedback onPress={this.props.moreClicked.bind(this, this.props.genre)}>
                    <View style={{height: 56, width: 56, backgroundColor: colors.tint, borderRadius:56, elevation: 10, alignItems: 'center', justifyContent: 'center' }}>
                      <Image style={{height: 42, width: 42, tintColor: 'white'}} source={require('./icons/arrow.png')}/>
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>
          </ScrollView>
      )
    else{
      return(
        <View style={{height: 195 , width: w , alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={colors.tint} />
        </View>
      )
    }
  }

}


