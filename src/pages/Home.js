import React, { useState, useEffect } from 'react'
import { Keyboard, FlatList, StatusBar } from 'react-native'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AntDesign from 'react-native-vector-icons/AntDesign'
import  Tarefa  from '../components/Tarefa'


export default function Home() {

    const keyAsyncStorage = "@blocoNotas:tarefas";

    const [task, setTask] = useState("")
    const [tasks, setTasks] = useState([])

    //adicionar
    async function addTasks(){
        
        const data = {
            id: String(new Date().getTime()),
            name: task
        }

        setTasks(oldValue => [...oldValue, data]);
        const vetData = [...tasks, data];

        try {

            await AsyncStorage.setItem(keyAsyncStorage, JSON.stringify(vetData));

        } catch (error) {

            Alert.alert("erro na gravação de dados");
        }
        Alert.alert("tarefa adicionada");
        setTask("");
    }
    
    //function para deletar tasks 
    async function excluirTask(id){
        const data = tasks.filter(item => item.id != id)
        await AsyncStorage.setItem(keyAsyncStorage, JSON.stringify(data))
        setTasks(data)
    }

    //carregar dados 
    async function loadTasks() {
        try {

            const retorno = await AsyncStorage.getItem(keyAsyncStorage);
            const dados = JSON.parse(retorno);

            setTasks(dados || []);

        } catch (error) {
            Alert.alert("erro no carregamento dos dados");
        }
    }

    useEffect(() => {
        loadTasks();
    }, []);

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='#1DB863'/>

            <View style={styles.container}> 
            <Text style={[styles.text, styles.title]}>IFRN.DO</Text>
                <Text style={[styles.text, { fontSize: 15 }]}>Você tem <Text style={{ fontWeight: 'bold' }}>{tasks.length} tarefas</Text></Text>
           </View>


            <View style={styles.inputContainer}>
                <TextInput style={styles.inputStylo} placeholder='Informe uma tarefa' placeholderTextColor={{ color: 'gray' }} onChangeText={setTask} value={task} />
                <TouchableOpacity style={styles.btn} onPress={() => addTasks()} onPressIn={Keyboard.dismiss}>
                    <AntDesign name="right" size={20} color={'gray'} />
                </TouchableOpacity>
            </View>

            <View style={styles.tarefas}>
                <FlatList data={tasks}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Tarefa name={item.name} apagar={() => excluirTask(item.id)} />
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#1DB863',
        width: '100%',
        height: 150,
    }, 
    text:{
        marginTop: 50,
        color: '#FFFFFF'
    }, 
    inputStylo:{
        
        flex: 1,
        height: '100%',
        backgroundColor: '#FFFFFF',
        paddingLeft: 20,
        color: 'gray',
        fontSize: 17,
    }, 
    btn:{
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderLeftWidth: 1,
        borderLeftColor: 'gray',
    }, 
    tarefas:{
        marginTop: 40,
        alignItems: 'center',
    },  
    title:{
        fontWeight: '700',
        fontSize: 24,
    }, 
    inputContainer:{
        margin: -30,
        width: '90%',
        height: 65,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5
    }

})