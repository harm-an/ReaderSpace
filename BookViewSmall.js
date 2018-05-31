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


export default class BookViewSmall extends Component<Props> {
  render() {
    return(
      <TouchableNativeFeedback onPress={this.props.onClick}>
        <View style={{backgroundColor: 'transparent', width: w-48, marginLeft: 24, marginTop: 8,marginBottom: 8, alignItems: 'center', flexDirection: 'row', marginRight: 24}}>
            
            <View style={{width: 93, height: 145, backgroundColor: 'transparent', elevation: 10, borderRadius: 4}}>
              <Image source={{uri: this.props.imageURL}}  style={{width: 93, height: 145, borderRadius: 4}}/>
            </View>
            <View style={{height: '100%', backgroundColor: 'transparent', marginLeft: 8, width: w-48-93}}>
              <Text style={styles.bookNameBig}>{this.props.name}</Text>
              <Text style={styles.bookPrice}>${this.props.price}</Text>
            </View>
            
        </View>
      </TouchableNativeFeedback>
    )
  }

}