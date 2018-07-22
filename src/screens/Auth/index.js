import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import config from '../../../config.json';

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


class Auth extends React.Component {
  componentDidMount() {
    GoogleSignin.configure({
      iosClientId: config.googleClientId,
      scopes: ['openid', 'email', 'profile'],
      shouldFetchBasicProfile: true,
    });
  }

    // Calling the following function will open the FB login dialogue:
    facebookLogin = async() => {
      try {
        const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
        if (result.isCancelled) {
          throw new Error('User cancelled request'); // Handle this however fits the flow of your app
        }
        console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
        // get the access token
        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
          throw new Error('Something went wrong obtaining the users access token');
          // Handle this however fits the flow of your app
        }
        console.log('Facebook Data', data);
        // create a new firebase credential with the token
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
        // login with credential
        const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
        console.log(currentUser);
        console.info(JSON.stringify(currentUser.user.toJSON()));
      } catch (e) {
        console.error(e);
      }
    }

    googleLogin = async() => {
      try {
        // Add any configuration settings here:
        const data = await GoogleSignin.signIn();
        console.log('Google Data', data);
        // create a new firebase credential with the token
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
        // login with credential
        const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
        console.log(currentUser, firebase);
        console.info(JSON.stringify(currentUser.user.toJSON()));
      } catch (e) {
        console.error(e);
      }
    }

    submitLogin = () => {
      firebase.auth().signInAndRetrieveDataWithEmailAndPassword('test@gmail.com', 'test')
        .then(credentials => {
          console.log(credentials);
        });
    }

    goOnline = () => {
      const db = firebase.database().ref('PKU');
      console.log(firebase.auth().currentUser);
      // firebase.auth()
      console.log(db);
    }

    render() {
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={this.facebookLogin}>
            <Text>
              FACEBOOK
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.googleLogin}>
            <Text>
              GOOGLE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goOnline}>
            <Text>
              FIREBASE
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
}

export default Auth;
