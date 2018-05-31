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
  ToastAndroid
} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
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

type Props = {};
export default class App extends Component<Props> {

  state = {
    view: 'Login',
  }

  componentDidMount(){
    GoogleSignin.configure({
         // only for iOS
      })
      .then(() => {
        // you can now call currentUserAsync()
      });
      GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
          // play services are available. can now configure library
          //Alert.alert('Hello')
      })
      .catch((err) => {
        console.log("Play services error", err.code, err.message);
      })

      GoogleSignin.currentUserAsync().then((user) => {
        console.log('USER', user);
        if(user){
          //Alert.alert(JSON.stringify(user.email))
        }
        this.setState({user: user});
        //ToastAndroid.show('Logged in to ' + user.email, ToastAndroid.SHORT)
        global.user = user
      }).done();
  }

  _signIn = () => {
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user);
      //Alert.alert(user.email)
      this.setState({user: user, view: 'HomePage'});
      ToastAndroid.show('Logged in to ' + user.email, ToastAndroid.SHORT)
      global.user = user
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
      //Alert.alert(JSON.stringify(err))
    })
    .done();
  }

  signOut= ()=>{
     Alert.alert('Hello')
    GoogleSignin.signOut()
    .then(() => {
      console.log('out');
    })
    .catch((err) => {

    });
  }

  render() {
    if(this.state.view == 'Login')
      return (
        <View style={styles.container}>
          <StatusBar
                backgroundColor={colors.statusBar}
                barStyle="dark-content"
              />
          <Text style={styles.welcome}>
            WELCOME TO READERSPACE
          </Text>
          <Text style={styles.instructions}>
            Find something 
          </Text>
          <Text style={styles.instructions}>
            good to read.
          </Text>
          <Text style={styles.instructions}>
            No matter where 
          </Text>
          <Text style={styles.instructions}>
            you are.
          </Text>
          <View style={{height: 16, backgroundColor: 'transparent'}}/>
          <View style={{width: w, justifyContent: 'center', flexDirection: 'row'}}>
            <View>
              <View style={{height: 32, backgroundColor: 'transparent'}}/>
              <View style={{width: 75, height: 117, backgroundColor: '#eeeeee', elevation: 10, borderRadius: 4, marginBottom: 24}}>
                  <Image source={{uri: 'http://ecx.images-amazon.com/images/I/911zs3wN43L.jpg'}}  style={{width: 75, height: 117, borderRadius: 4}}/>
              </View>
              <View style={{width: 75, height: 117, backgroundColor: '#eeeeee', elevation: 10, borderRadius: 4}}>
                  <Image source={{uri: 'http://ecx.images-amazon.com/images/I/51tgA2VJlUL.jpg'}}  style={{width: 75, height: 117, borderRadius: 4}}/>
              </View>
            </View>
            <View style={{width: 24, backgroundColor: 'transparent'}}/>
            <View>
              <View style={{width: 75, height: 117, backgroundColor: '#eeeeee', elevation: 10, borderRadius: 4, marginBottom: 24}}>
                  <Image source={{uri: 'http://ecx.images-amazon.com/images/I/91jJRCCi2ZL.jpg'}}  style={{width: 75, height: 117, borderRadius: 4}}/>
              </View>
              <View style={{width: 75, height: 117, backgroundColor: '#eeeeee', elevation: 10, borderRadius: 4}}>
                  <Image source={{uri: 'http://ecx.images-amazon.com/images/I/51K8bdn3mxL.jpg'}}  style={{width: 75, height: 117, borderRadius: 4}}/>
              </View>
            </View>
            <View style={{width: 24, backgroundColor: 'transparent'}}/>

            <View>
              <View style={{height: 32, backgroundColor: 'transparent'}}/>
              <View style={{width: 75, height: 117, backgroundColor: '#eeeeee', elevation: 10, borderRadius: 4, marginBottom: 24}}>
                  <Image source={{uri: 'http://ecx.images-amazon.com/images/I/410JtTsdiUL.jpg'}}  style={{width: 75, height: 117, borderRadius: 4}}/>
              </View>
              <View style={{width: 75, height: 117, backgroundColor: '#eeeeee', elevation: 10, borderRadius: 4}}>
                  <Image source={{uri: 'http://ecx.images-amazon.com/images/I/41HD39Ort8L.jpg'}}  style={{width: 75, height: 117, borderRadius: 4}}/>
              </View>
            </View>
          </View>
          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.googleButtonDark, false)} useForeground={true} onPress={this._signIn.bind(this)}>
              <View style={[styles.navBar, {backgroundColor: colors.googleButton, position:'absolute', bottom: 0, height: 50}]}>
                <View style={{position: 'absolute', height: 50, width: 50, backgroundColor: colors.googleButtonDark, alignItems: 'center', justifyContent: 'center'}}>
                  <Image source = {require('./icons/google-plus.png')}  style={[styles.tabIcon, {tintColor: colors.primary}]}/>
                </View>
                <View style={{position: 'absolute', left: 50, height: 50, width: w-100, backgroundColor: colors.googleButton, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{color: colors.primary, fontFamily: 'GoogleSans-Medium'}}>Sign in with Google</Text>
                </View>
              </View> 
          </TouchableNativeFeedback>
          
        </View>
      );
    else
      return(
        <HomePage/>
      )
  }
}


