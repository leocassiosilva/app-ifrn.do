  
//import CheckBox from 'react-native-check-box';
import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import  {CheckBox}  from './CheckBox';


export function Tarefa(props){
    
    return (
        <View style={styles.container}>
            <CheckBox isChecked={props.checked} onPress={props.onChecked} />


            <Text style={styles.tarefa}>{props.name}</Text>

            <View style={styles.contanerBtn}>
                <TouchableOpacity style={styles.btn} onPress={props.deletar}>
                    <Icon name='trash' size={30} color='gray'/>
                </TouchableOpacity>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:15, 
        width:320,
        height:50, 
        backgroundColor:"#DEE4E4",
        flexDirection:'row', 
        alignItems:'center',
        justifyContent:'space-between', 
        borderRadius:5,
    },
    tarefa:{
        fontSize:18, 
    },
    btn:{
        padding:10, 
        marginRight:15
    }, 
    checkbox:{
        marginRight:2,
        marginLeft:30
    }
})