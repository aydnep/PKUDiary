import React, { Component } from 'react';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


export default class App extends Component {
  componentDidMount() {
    // const googleProvider = new firebase.auth.GoogleAuthProvider();
    // firebase.auth().createUserAndRetrieveDataWithEmailAndPassword()
    firebase.auth().signInAndRetrieveDataWithEmailAndPassword('test@gmail.com', 'test')
      .then(credentials => {
        console.log(credentials);
      });
  }

  // Calling the following function will open the FB login dialogue:
  facebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw new Error('User cancelled request'); // Handle this however fits the flow of your app
      }

      console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw new Error('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
      }

      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

      // login with credential
      const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

      console.info(JSON.stringify(currentUser.user.toJSON()))
    } catch (e) {
      console.error(e);
    }
  }

  googleLogin = async () => {
    try {
      // Add any configuration settings here:
      await GoogleSignin.configure({
        iosClientId: '373553291359-95hf9u8d24b9hj1g7fthhkt3qsb648t2.apps.googleusercontent.com',
        scopes: ['openid', 'email', 'profile'],
        shouldFetchBasicProfile: true
      });


      const data = await GoogleSignin.signIn();

      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      // login with credential
      const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

      console.info(JSON.stringify(currentUser.user.toJSON()));
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <TouchableOpacity onPress={this.facebookLogin}>
          <Text>FACEBOOK</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.googleLogin}>
          <Text>GOOGLE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
