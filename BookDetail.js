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
  WebView,
  BackHandler,
  Linking,
  ToastAndroid
} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import BookView from './BookView.js'
import HomePage from './HomePage.js'
import GenreBooks from './GenreBooks.js'
import BooksByGenre from './BooksByGenre.js'
import BooksByRecom from './BooksByRecom.js'

import Communications from 'react-native-communications';


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
const user = GoogleSignin.currentUser();

type Props = {};


class Favorite extends Component<Props> {

  state={
    fill: false,
  }

  componentDidMount() {
      GoogleSignin.currentUserAsync().then((user) => {
        //Alert.alert(JSON.stringify(user))
        this.setState({user: user});
        object = {email: user.email, id: JSON.stringify(this.props.asin)}
          fetch('http://192.168.43.54:8000/polls/checkFav', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(object)
        })
        .then((response) => response.json())
        .then((responseJson) => {
          
          //booksName = responseJson.result;
          //Alert.alert(JSON.stringify(responseJson))
          if(responseJson.result=='true'){
            this.setState({fill: true})
          }else{
            this.setState({fill: false})
          }
        })
        .catch((error) => {
          ToastAndroid.show('Please check your connection', ToastAndroid.SHORT)
          //this.setState({isLoading: false})
        });
      }).done();
  }

  saveBook = ()=>{
    //Alert.alert(this.state.user.email)
    jsObject = {email: this.state.user.email, id: JSON.stringify(this.props.asin)}
    fetch('http://192.168.43.54:8000/polls/userProfileUpdate', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsObject)
      })
      .then((response) => response.json())
      .then((responseJson) => {
        
      
        //Alert.alert(JSON.stringify(responseJson.result))
        ToastAndroid.show('Book Saved to Library', ToastAndroid.SHORT);
        this.setState({fill: true})
      })
      .catch((error) => {
        ToastAndroid.show('Please check your connection', ToastAndroid.SHORT);
        //this.setState({isLoading: false})
      });
    
  }

  deleteBook = ()=>{
    jsObject1 = {email: this.state.user.email, id: JSON.stringify(this.props.asin)}
    fetch('http://192.168.43.54:8000/polls/deleteBook', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsObject1)
      })
      .then((response) => response.json())
      .then((responseJson) => {
        
      
        //Alert.alert(JSON.stringify(responseJson.result))
        ToastAndroid.show('Book removed from Library', ToastAndroid.SHORT);
        this.setState({fill: false})
      })
      .catch((error) => {
        ToastAndroid.show('Please check your connection', ToastAndroid.SHORT);
        //this.setState({isLoading: false})
      });
  }
  render() {
    if(!this.state.fill)
      return(
        <TouchableNativeFeedback onPress={()=>this.saveBook()}>
          <View style={{height: 56, width: 56, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', right: 0, position: 'absolute'}}>
                <Image style={{height: 32, width: 32, tintColor: colors.tint}} source={require('./icons/heartLine.png')}/>
          </View>
        </TouchableNativeFeedback>
      )
    else
      return(
        <TouchableNativeFeedback onPress={(()=>this.deleteBook())}>
          <View style={{height: 56, width: 56, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', right: 0, position: 'absolute'}}>
                <Image style={{height: 32, width: 32,tintColor: colors.tint}} source={require('./icons/heartFill.png')}/>
          </View>
        </TouchableNativeFeedback>
      )

    

  }
}

class BackButton extends Component<Props> {
    render(){
      return(
        <TouchableNativeFeedback onPress={this.props.onClick}>
                <View style={{height: 56, width: 56, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center'}}>
                  <Image style={styles.actionBI} source={require('./icons/back.png')}/>
                </View>
         </TouchableNativeFeedback>
      )
    }
}

export default class BookDetail extends Component<Props> {

  state={
    view:'BookDetail',
    book:this.props.book,
  }
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', ()=>{

        this.setState({view: this.props.from})
        return true
    });
    //Alert.alert(JSON.stringify(user))

  }

  goBack=()=>{
    this.setState({view:this.props.from})
  }

  render() {
    switch(this.state.view){ 
      case 'BookDetail':  
        return (
          <View style={styles.container}>
          <ScrollView  contentContainerStyle={styles.containerDetail}>
            <StatusBar
                  backgroundColor={colors.statusBar}
                  barStyle="dark-content"
                />
            <View style={{height: 56, width: w, backgroundColor: 'white'}}>
              <BackButton onClick={()=>this.goBack()}/>
              <Favorite asin = {this.state.book.asin}/>
            </View>

            <View style={{width: 200, height: 312, backgroundColor: '#eeeeee', elevation: 10, borderRadius: 4, alignItems: 'center'}}>
                  <Image source={{uri: this.state.book.imageURL}}  style={{width: 200, height: 312, borderRadius: 4}}/>
             </View>
            <Text style={styles.bookNameDetail}>
                    {this.state.book.title} 
            </Text>
            <Text style={styles.bookGenre}>
                    {this.state.book.genre} 
            </Text>
            <Text style={styles.bookDescription}>
                    {this.state.book.description}
            </Text>
            <View style={{width: w, marginLeft: 0}}>
              <Text style={{fontSize: 18, fontFamily: 'GoogleSans-Bold', color: colors.light, marginTop: 8, marginLeft: 24}}>VIEW SIMILAR</Text>
              <BooksByRecom onClick={(data)=>this.setState({book: data})} bookName={this.state.book.title}/>
              
            </View>

          </ScrollView>
          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.googleButtonDark, false)} useForeground={true} onPress={()=>Communications.web('https://www.amazon.com/dp/00' + this.props.book.asin)}>
                <View style={[styles.navBar, {backgroundColor: colors.googleButton, height: 50}]}>
                  <View style={{position: 'absolute', height: 50, width: 50, backgroundColor: colors.googleButtonDark, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: 'white', fontFamily: 'GoogleSans-Medium'}}>${this.state.book.price}</Text>
                  </View>
                  <View style={{position: 'absolute', left: 50, height: 50, width: w-100, backgroundColor: colors.googleButton, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: colors.primary, fontFamily: 'GoogleSans-Medium'}}>BUY</Text>
                  </View>
                </View> 
              </TouchableNativeFeedback>
          </View>
        )
      case 'HomePage':
        return <HomePage/>
      case 'GenreBooks':
        return <GenreBooks genre={this.props.genre}/>
    }   
  }
}


