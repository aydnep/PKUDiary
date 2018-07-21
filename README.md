## LINKS
### Firebase
* IOS
  * [Core](https://rnfirebase.io/docs/v4.2.x/installation/ios)
  * [Swift issue](https://stackoverflow.com/questions/45317777/could-not-find-a-valid-googleservice-info-plist-in-your-project)
* Android
  * [Core](https://rnfirebase.io/docs/v4.2.x/installation/android)
  * Downgrade Java to v8 each time before compile
  ```
  export JAVA_HOME=$(/usr/libexec/java_home -v 1.8)
  ```
  [Issue](https://github.com/invertase/react-native-firebase/issues/1070)

### FBSDK
Install FBSDK via CocoaPods 
```
pod 'FBSDKShareKit'
pod 'FBSDKLoginKit'
```
[Add correct Framework Paths](http://prntscr.com/k3zk56)

### GoogleSignIn
* IOS
  * [CoreFoundation not found fix](https://github.com/react-native-community/react-native-google-signin/issues/361) or [Here](http://prntscr.com/k8q6tr)