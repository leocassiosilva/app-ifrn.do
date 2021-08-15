
import React, { useState, useEffect } from 'react'
import { Keyboard, FlatList, StatusBar } from 'react-native'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AntDesign from 'react-native-vector-icons/AntDesign'
import  {Tarefa}  from '../components/Tarefa'


export default function Home() {

    const keyAsyncStorage = "@ifrndo:tarefas";

    const [task, setTask] = useState("")
    const [tasks, setTasks] = useState([])
    const [count, setCount] = useState(0); 

    //adicionar
    async function addTasks(){
      
        if(task.length){

            const data = {
                id: String(new Date().getTime()),
                name: task,
                checked: false
            }
    
            const vetData = [...tasks, data];
    
            try {
                await AsyncStorage.setItem(keyAsyncStorage, JSON.stringify(vetData));
            } catch(error) {
                Alert.alert("Erro ao guardar os dados");
            }

            loadTasks(); 

        }
        
        //Alert.alert("tarefa adicionada");
        setTask('');
        Keyboard.dismiss();
    }
    
    //function para deletar tasks 
    async function excluirTask(id){
        const data = tasks.filter(item => item.id != id)
        
        try { 
            await AsyncStorage.setItem(keyAsyncStorage, JSON.stringify(data))
        }catch(error){
            Alert.alert("Erro ao Excluir!");
        }
        //chama função load
        loadTasks();
    }


    async function setCheckedTasks(index){
        let item = tasks[index];

        item = {
            ...item,
            checked: !item.checked
        }

        tasks[index] = item;

        await AsyncStorage.setItem(keyAsyncStorage, JSON.stringify(tasks));
        loadTasks();
    }

    //carregar dados 
    async function loadTasks() {
        try {

            const retorno = await AsyncStorage.getItem(keyAsyncStorage);
            const dados = JSON.parse(retorno);

            await setTasks(dados || []);

            try{
                await setCount(dados.filter(item => item.checked == false).length);
            } catch {
                await setCount(0);
            }

        } catch (error) {
            Alert.alert("erro no carregamento dos dados");
        }
    }

    //limpar
    async function clear() {
        await AsyncStorage.clear();
    }

    useEffect(() => {
        loadTasks();
    }, []);

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='#1DB863'/>

            <View style={styles.header}> 
            <Text style={[styles.text, styles.title]}>IFRN.DO</Text>
                <Text style={[styles.text, { fontSize: 15 }]}>Você tem <Text style={{ fontWeight: 'bold' }}>{count} tarefas</Text></Text>
           </View>


            <View style={styles.inputContainer}>
                <TextInput style={styles.inputStylo} placeholder='Informe uma tarefa' placeholderTextColor={{ color: 'gray' }} onChangeText={setTask} value={task} />
                <TouchableOpacity style={styles.btn} onPress={() => addTasks()}>
                    <AntDesign name="right" size={20} color={'gray'} />
                </TouchableOpacity>
            </View>

            <View style={styles.tarefas}>
            <FlatList data={tasks}
                    keyExtractor={item => item.id.toString()}
                    renderItem={ ({item, index}) => (
                        <Tarefa name={item.name} onChecked={ () => setCheckedTasks(index)} checked={item.checked} apagar={() => excluirTask(item.id)} />

                    )}
                />
            </View> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#1DB863',
        width: '100%',
 
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
        margin: 30,
        width: '90%',
        height: 65,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5
    }

})