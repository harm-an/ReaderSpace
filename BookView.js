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
  ScrollView
} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
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


export default class BookView extends Component<Props> {
  render() {
    return(
      <TouchableNativeFeedback onPress={this.props.onClick}>
        <View style={{backgroundColor: 'transparent', width: 125+12+12, marginLeft: 12, marginTop: 16, alignItems: 'center'}}>
            <View style={{height: 8, backgroundColor: 'transparent'}}/>
            <View style={{width: 125, height: 195, backgroundColor: '#eeeeee', elevation: 10, borderRadius: 4}}>
              <Image source={{uri: this.props.imageURL}}  style={{width: 125, height: 195, borderRadius: 4}}/>
            </View>
            <Text style={styles.bookName}>{this.props.name}</Text>
            <Text style={styles.bookPrice}>${this.props.price}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }

}