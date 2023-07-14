// android 226447231772-ho81bcoeqcupeun26fbh5v4gaibhgi2u.apps.googleusercontent.com

import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import Home from './Home';
import { UserContext } from '../context/app.context';

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { setToken } = useContext(UserContext);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "226447231772-ho81bcoeqcupeun26fbh5v4gaibhgi2u.apps.googleusercontent.com",
    iosClientId: "226447231772-pdjrshchhkj2k7gibjhdfv3841aogefl.apps.googleusercontent.com",
    expoClientId: "226447231772-h6l7223mqqvh7bc514ilsu56jn42fnq2.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleSigninWithGoogle();
  }, [response]);

  const handleSigninWithGoogle = async () => {
    const user = await AsyncStorage.getItem('@user');
    if(!user){
      if(response?.type === 'success'){
        await getUserInfo(response.authentication.accessToken);
        await AsyncStorage.setItem('token', response.authentication.accessToken);
        setToken(response.authentication.accessToken);
      }
    }else{
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token) => {
    if(!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      const user = await response.json();
      const userString = JSON.stringify(user);
      setUserInfo(user);
      await AsyncStorage.setItem('@user', userString);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity 
          onPress={() => promptAsync()}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
            height: 50,
            backgroundColor: '#5d5aad',
            borderRadius: 10,
            alignSelf: 'center',
            marginTop: 250,
          }}>
            <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png" }} style={{
              width: 40,
              height: 40,
              resizeMode: 'contain',
            }} />
            <Text style={{
              fontSize: 25,
              marginLeft: 10,
            }}>Login with Google</Text>
        </TouchableOpacity>
        <StatusBar style='auto' />
      </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  }
})