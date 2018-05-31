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
  ImageBackground,
  ToastAndroid
} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import BookView from './BookView.js'
import BookDetail from './BookDetail.js'
import BooksByGenre from './BooksByGenre.js'
import GenreBooks from './GenreBooks.js'
import BooksByUser from './BooksByUser.js'
import App from './App.js'

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





export default class HomePage extends Component<Props> {

  state={
    view:'Home',
    genre: 'Null',
    user: {photo: 'null'}
  }

  componentDidMount(){
    GoogleSignin.currentUserAsync().then((user) => {
        //Alert.alert(JSON.stringify(user))
        this.setState({user: user, fill:true});
      }).done();
  }
  returnBooks = () => {
    var books = [];
    for(let i = 0; i<5; i++){
      books.push(<BookView key={i} name={booksDB[i].title} imageURL={booksDB[i].imUrl} price={booksDB[i].price} onClick={()=>this.setState({view:'BookDetail', book: {'title': booksDB[i].title, 'price': booksDB[i].price, 'imageURL': booksDB[i].imUrl, 'genre': booksDB[i].genre, 'description': booksDB[i].description, 'asin': booksDB[i].asin}})}/>)
    }
    
    return books;

  }
  signOut= ()=>{
     //Alert.alert('Hello')
    GoogleSignin.signOut()
    .then(() => {
      console.log('out');
      this.setState({view: 'App'})
      ToastAndroid.show('You are successfully logged out', ToastAndroid.SHORT)
    })
    .catch((err) => {
      ToastAndroid.show('Please check your connection', ToastAndroid.SHORT)
    });
  }
  render() {
    switch(this.state.view){
      case 'Home':
        return (
          <View style={styles.container}>
            <StatusBar
                    backgroundColor={colors.statusBar}
                    barStyle="dark-content"
                  />
              <View style={{height: 56, width: w, backgroundColor: 'white'}}>
                 <TouchableNativeFeedback onPress={this.signOut.bind(this)}>
                  <View style={{height: 56, width: 56, alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 0}}>
                    <Image source={{uri: this.state.user.photo}} style={{height: 36, width: 36 , borderRadius: 56}}/>
                  </View>
                </TouchableNativeFeedback>
              </View>
            <ScrollView >
              
              {/*<Text style={styles.type}>
                  My Library 
              </Text>
              <ScrollView horizontal={true}>
              {this.returnBooks()}
              </ScrollView>*/}
              <Text style={styles.type}>
                  My Library 
              </Text>
               <BooksByUser onClick={(data)=>this.setState({view: 'BookDetail', book: data})} bookName={'The Prophet'}/>
              <Text style={styles.type}>
                  Business 
              </Text>
              <BooksByGenre onClick={(data)=>this.setState({view: 'BookDetail', book: data})} genre={'Business'} moreClicked={(data)=>this.setState({view: 'GenreBooks', genre: data})}/>

              <Text style={styles.type}>
                  Classics 
              </Text>

              <BooksByGenre onClick={(data)=>this.setState({view: 'BookDetail', book: data})} genre={'Classics'} moreClicked={(data)=>this.setState({view: 'GenreBooks', genre: data})}/>
              
              <Text style={styles.type}>
                  Health 
              </Text>
              <BooksByGenre onClick={(data)=>this.setState({view: 'BookDetail', book: data})} genre={'Health'} moreClicked={(data)=>this.setState({view: 'GenreBooks', genre: data})}/>
              <Text style={styles.type}>
                  History 
              </Text>
              <BooksByGenre onClick={(data)=>this.setState({view: 'BookDetail', book: data})} genre={'History'} moreClicked={(data)=>this.setState({view: 'GenreBooks', genre: data})}/>
                <Text style={styles.type}>
                  Fiction 
              </Text>
              <BooksByGenre onClick={(data)=>this.setState({view: 'BookDetail', book: data})} genre={'Fiction'} moreClicked={(data)=>this.setState({view: 'GenreBooks', genre: data})}/>
              
              <Text style={styles.type}>
                  Poetry 
              </Text>
              <BooksByGenre onClick={(data)=>this.setState({view: 'BookDetail', book: data})} genre={'Poetry'} moreClicked={(data)=>this.setState({view: 'GenreBooks', genre: data})}/>
              <Text style={styles.type}>
                  Reseach Magazines
              </Text>
              <BooksByGenre onClick={(data)=>this.setState({view: 'BookDetail', book: data})} genre={'Reseach Magazines/Technical magazines'} moreClicked={(data)=>this.setState({view: 'GenreBooks', genre: data})}/>
              <Text style={styles.type}>
                  Spiritual 
              </Text>
              <BooksByGenre onClick={(data)=>this.setState({view: 'BookDetail', book: data})} genre={'Spiritual'} moreClicked={(data)=>this.setState({view: 'GenreBooks', genre: data})}/>
              <Text style={styles.type}>
                  Sports 
              </Text>
              <BooksByGenre onClick={(data)=>this.setState({view: 'BookDetail', book: data})} genre={'Sports'} moreClicked={(data)=>this.setState({view: 'GenreBooks', genre: data})}/>
              <Text style={styles.type}>
                  Travel Guide 
              </Text>
              <BooksByGenre onClick={(data)=>this.setState({view: 'BookDetail', book: data})} genre={'City Book/Travel Guide'} moreClicked={(data)=>this.setState({view: 'GenreBooks', genre: data})}/>
            </ScrollView>
          </View>

        );
      case 'BookDetail':
        return <BookDetail book={this.state.book} from={'HomePage'}/>
      case 'GenreBooks':
        return <GenreBooks genre={this.state.genre}/>
      case 'App':
        return <App/>
    }
  }

}


