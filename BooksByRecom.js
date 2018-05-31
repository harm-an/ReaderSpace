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
  ToastAndroid
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
var booksName

type Props = {};




export default class BooksByRecom extends Component<Props> {

  state={
    view:'Home',
    isLoading: true
  }
  

  componentDidMount(){
    GoogleSignin.currentUserAsync().then((user) => {
        //Alert.alert(JSON.stringify(user))
        this.setState({user: user});
        //Alert.alert(user.email);
        object = {name: this.props.bookName, email: user.email};
        fetch('http://192.168.43.54:8000/polls/insert', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(object)
      })
      .then((response) => response.json())
      .then((responseJson) => {
        
        booksName = responseJson.result;
        //Alert.alert(JSON.stringify(booksName))
        this.setState({isLoading: false})
      })
      .catch((error) => {
        ToastAndroid.show("Please check your connection", ToastAndroid.SHORT)
        //this.setState({isLoading: false})
      });
          
      }).done();
  

    
  }

  returnBooks = () => {
    var books = [];

    for(let j = 0; j<booksName.length; j++){
      for(let i = 0; i<booksDB.length; i++){
        if(booksName[j] == booksDB[i].title)
        books.push(<BookView key={i} name={booksDB[i].title} imageURL={booksDB[i].imUrl} price={booksDB[i].price} onClick={this.props.onClick.bind(this,{'title': booksDB[i].title, 'price': booksDB[i].price, 'imageURL': booksDB[i].imUrl, 'genre': booksDB[i].genre, 'description': booksDB[i].description, 'asin': booksDB[i].asin})}/>)
      }
    }
    
    
    return books;

  }

  render() {
    if(!this.state.isLoading)
      return (
          <ScrollView horizontal={true}>
              {this.returnBooks()}
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


