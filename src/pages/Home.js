import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {Input} from '../components/Input'


export function Home( { navigation} ) {

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
                  IFRN - Pau dos Ferros
            </Text>
          </View> 

          <View style={styles.form}>
            <Input  placeholder="Login"/>
            
            <Input  placeholder="Senha"/>

            <TouchableOpacity style={styles.btn}>
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
