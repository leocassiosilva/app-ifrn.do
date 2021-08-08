import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

export function Input(props){ 
    
    return(
        <View style={styles.containerInput}>
            <TextInput 
                style={styles.input}
                placeholder={props.label} secureTextEntry={props.senha} onChangeText={props.onChangeText}/>
        </View>
    )
}

const styles = StyleSheet.create({

    containerInput:{
        width: 300,
        height: 42,
        backgroundColor: '#FFFFFF',
        flexDirection:'row',
        alignItems: 'center',
        borderRadius: 5,
    },
    
    input:{
        flex:1,
        height:'100%',
        paddingLeft: 20,
        color: '#B2B2B2',
        fontSize: 17,
        backgroundColor: '#FFFFFF',

    }
  });