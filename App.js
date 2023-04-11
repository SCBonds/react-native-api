// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, View, Text, Image, Button } from 'react-native';
// import * as Google from 'expo-auth-session/providers/google';
// import * as WebBrowser from 'expo-web-browser';

// WebBrowser.maybeCompleteAuthSession();

// export default function App() {

//   const [accessToken, setAccessToken] = React.useState();
//   const [userInfo, setUserInfo] = React.useState();
//   const [message, setMessage] = React.useState();

//   return (

//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },



// import React, { useState, useEffect }  from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import Account from "@tasit/account";
// import { Dimensions } from 'react-native';
// import { AsyncStorage } from 'react-native';
// import * as WebBrowser from 'expo-web-browser';
// import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
// import Main from './Main'

// WebBrowser.maybeCompleteAuthSession();

// // Endpoint
// const discovery = {
//   authorizationEndpoint: 'https://www.strava.com/oauth/mobile/authorize',
//   tokenEndpoint: 'https://www.strava.com/oauth/token',
//   revocationEndpoint: 'https://www.strava.com/oauth/deauthorize',
// };

// import * as Random from "expo-random";

// export default function App() {  
//   const [code, setCode] = useState(true); 
//   const { width } = Dimensions.get('window');

//   const [request, response, promptAsync] = useAuthRequest(
//     {
//       clientId: '103330',
//       scopes: ['read,activity:read'],
//       // For usage in managed apps using the proxy
//       redirectUri: makeRedirectUri({
//         // For usage in bare and standalone
//         // the "redirect" must match your "Authorization Callback Domain" in the Strava dev console.
//         native: 'your.app://redirect',
//       }),
//     },
//     discovery
//   );

//   React.useEffect(() => {
//     if (response?.type === 'success') {
//       fetch('https://www.strava.com/oauth/token?client_id=51548&client_secret=28d56211b9ca33972055bf61010074fbedc3c7c2&code=' + response.params.code + '&grant_type=authorization_code',
//         {
//           method: 'POST'
//         })
//         .then(res => res.json())
//         .then(async (json) => {
//           console.log(json)
//           await AsyncStorage.setItem(
//             'rt',
//             json.refresh_token
//           );
//           setCode(json);
//           createUser(json.athlete.id, json.refresh_token)
//         })
//     }
//   }, [response]);

//   const stravaOauth = () => {
//     promptAsync()
//   }

//   const { width } = Dimensions.get('window');
  
//   return (
//     <Home stravaOauth={stravaOauth} code={code}></Home>
//   )

// }

// class Home extends React.Component <{stravaOauth: any, code: string}, {}> {
//   state = {
//     accessToken: "",
//     message: "Awaiting accesstoken",
//     address: "",
//     account: undefined
//   };

//   async getAccount() {
//     async function makeAccount() {
  
//       const account = Account.createUsingRandomness(randomBytes);
//       const address = account.address;
//       return {address, account}
//     }
//     const {address, account} = await makeAccount();
//     this._storeData('account', JSON.stringify(account))

//     this.setState({address: address, account: account})
//   }

//   setAccount(accountString: string) {
//     const account = JSON.parse(accountString)
//     console.log(account)

//     this.setState({address: account.signingKey.address, account: account})
//   }

//   _storeData = async (key: string, value: string) => {
//     try {
//       await AsyncStorage.setItem(
//         key,
//         value
//       );
//     } catch (error) {
//       // Error saving data
//     }
//   };

//   _retrieveData = async (key: string) => {
//     try {
//       const value = await AsyncStorage.getItem(key);
//       if (value !== null) {
//         // We have data!!
//         return value;
//       }
//     } catch (error) {
//       // Error retrieving data
//     }
//   };

//   render() {
//     return (
//       <Main account={this.state.account} stravaOAuth={this.props.stravaOauth} code={this.props.code}></Main>
//     );
//   }
// }

// const { width } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     textAlign: 'center',
//     //backgroundColor: '#282c34',
//     color: 'whitesmoke',
//   },

// linearGradient: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width,
//     borderRadius: 5
//   },

//   AppHeader: {
//     backgroundColor: '#282c34',
//     // min-height: 80vh;
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     // font-size: calc(10px + 2vmin);
//     color: 'white'
//   }
// });


import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.strava.com/oauth/mobile/authorize',
  tokenEndpoint: 'https://www.strava.com/oauth/token',
  revocationEndpoint: 'https://www.strava.com/oauth/deauthorize',
};

export default function App() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '103330',
      scopes: ['activity:read_all'],
      redirectUri: makeRedirectUri({
        native: 'react-native-api://development.bluspkr.com',
      }),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
        }}
    />
  );
}