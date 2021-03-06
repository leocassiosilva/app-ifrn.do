import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {Input} from '../components/Input'
import api from '../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage';


export function Login({navigation}) {

    const keyAsyncStorage = "@ifrndo:login";

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    async function autenticationUser(){
      try {
        const retorno = await AsyncStorage.getItem(keyAsyncStorage); 
        const parseJson = JSON.parse(retorno); 

        token = (parseJson || '');  

        await api.get('minhas-informacoes/meus-dados/',{
          headers:{
              'authorization': 'jwt ' + token,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
        });

        navigation.navigate('Home');

      } catch(error){
        console.log("Login"); 
      }
    }


    async function handleLogin(){
        var params = new URLSearchParams();
        params.append('username', login);
        params.append('password', senha); 

      try {
            const responseToken = await api.post('autenticacao/token/', params);
            const {token} = responseToken.data;

            await AsyncStorage.setItem(keyAsyncStorage, JSON.stringify(token));
            console.log(token)
            setLogin(''); 
            setSenha(''); 
            Keyboard.dismiss(); 

            autenticationUser();

      }catch(error){
        Alert.alert('Error');
      }
    }

    async function clear() {
      await AsyncStorage.clear();
    }

    useEffect( ()=> {
      autenticationUser();
    }, []);

    return (
        <View style={styles.container}>
          <StatusBar
            animated={true}
            backgroundColor="#1DB863"/>

          <View style={styles.imgLogo}>
            <Image
                  source={require('../img/logo.png')}
                  style={styles.logo}
            />  
            <Text style={styles.textLogo}>
                  IFRN.DO
            </Text>
          </View> 

          <View style={styles.form}>
            <Input label='Login' onChangeText = {text => setLogin(text)}/>
            
            <Input label='Senha' senha={true} onChangeText = {text => setSenha(text)}/>

            <TouchableOpacity style={styles.btn} onPress={handleLogin}>
              <Text style={styles.textBtn}>
                    Entrar
              </Text>
            </TouchableOpacity>

          </View>
        </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1DB863',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  imgLogo:{
    height:200,
    width:'100%',
    alignItems:'center',
  },
  logo:{
    height:132,
    width:88,
    alignItems:'center'
  }, 
  textLogo:{
    paddingTop:20,
    fontSize:30, 
    color:'#FFFFFF'
  }, 
  form:{
    height:300,
    justifyContent:'space-evenly'
  }, 
  btn:{
    backgroundColor:'#666666',
    height:49,
    width:300, 
    justifyContent:'center',
    alignItems:'center'
  }, 
  textBtn:{
    color:'#FFFFFF', 
    fontSize:18
  }
});
