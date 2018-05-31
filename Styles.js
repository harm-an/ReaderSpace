'use strict';
import {
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

var React = require('react-native');
var colors = require('./Colors.js');
const h = Dimensions.get('window').height
const w = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  containerDetail: {
    //flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },

  welcome: {
    marginTop: 40,
    fontSize: 20,
    marginLeft: 40,
    color: '#BEBEBE',
    fontFamily: 'GoogleSans-Bold',
    margin: 10,
  },
  instructions: {
    marginLeft: 40,
    color: '#333333',
    fontSize: 40,
    marginBottom: 5,
    fontFamily: 'GoogleSans-Bold',
  },
  type: {
    marginLeft: 24,
    color: '#333333',
    fontSize: 40,
    marginBottom: 5,
    fontFamily: 'GoogleSans-Bold',
  },
  bookName: {
    color: '#333333',
    fontSize: 16,
    marginBottom: 0,
    marginTop: 8,
    fontFamily: 'GoogleSans-Medium',
    textAlign: 'center',
  },
  bookNameBig: {
    color: '#333333',
    fontSize: 16,
    marginBottom: 0,
    marginLeft: 0,
    marginTop: 8,
    fontFamily: 'GoogleSans-Medium',
    textAlign: 'left',
  },
  bookNameDetail: {
    color: '#333333',
    fontSize: 32,
    marginBottom: 0,
    marginTop: 16,
    fontFamily: 'GoogleSans-Bold',
    textAlign: 'center',
    marginLeft: 24,
    marginRight: 24,
  },
  bookGenre:{
    color: colors.light,
    fontSize: 24,
    marginBottom: 5,
    marginTop: 0,
    fontFamily: 'GoogleSans-Bold',
  },
  bookDesc: {
    color: '#333333',
    fontSize: 24,
    marginBottom: 5,
    marginLeft: 24,
    marginTop: 0,
    fontFamily: 'GoogleSans-Bold',
  },
  bookDescription: {
    color: '#333333',
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 24,
    marginTop: 0,
    marginRight: 24,
    fontFamily: 'GoogleSans-Medium',
    textAlign: 'left'
  },
  bookPrice: {
    color: colors.light,
    fontSize: 16,
    marginBottom: 5,
    marginTop: 0,
    fontFamily: 'GoogleSans-Bold',
  },
  tabIcon: {
    
    height: 24,
    width: 24,
  },
  actionBI: {
    
    height: 48,
    width: 48,
    tintColor: colors.tint,
  },

  navBar:{
    height: 56,
    backgroundColor: colors.accent,
    width: w
  },
  navButton: {
    position: 'absolute',
    left:0,
    top:0,
    backgroundColor: colors.teal,
    width:56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonRight: {
    position: 'absolute',
    right:0,
    top:0,
    backgroundColor: colors.teal,
    width:56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBarTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 36,
    marginLeft: 16,
    color: colors.primary
  },
  collegeCard: {
    width: w-16,
    borderRadius: 8,
    elevation: 4,
    height: 150,
    backgroundColor: colors.primary,
    marginTop: 8,
    shadowColor: colors.input,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 2,
    shadowOpacity: 0.7,
    flexDirection: 'row',
    justifyContent:'center'
  },
  cardImage: {
    height: 150, width: 100, backgroundColor: 'transparent', justifyContent:'center', alignItems: 'center'
  },
  cardContent: {
    height: 150, width: w-16-100, backgroundColor:'transparent',
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center'
  },
  cardCollegeName: {
    fontFamily: 'Montserrat-Medium',
    color:colors.accent
  },
  cardCollegeState: {
    fontFamily: 'Montserrat-Regular',
    color:colors.input,
    marginTop:4,
    fontSize: 12
  },
  cardCollegePrograms: {
    fontFamily: 'Montserrat-Medium',
    color: colors.accentBright,
    marginTop: 3,
    fontSize: 12
  },
});

module.exports = styles;