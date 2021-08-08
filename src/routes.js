import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './pages/Login';
import  Home  from './pages/Home';


const Stack = createStackNavigator();

export function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name='login' component={Login}  options={{ headerShown: false  }}  />
            <Stack.Screen name='Home' component={Home}  options={{ headerShown: false  }}  />

        </Stack.Navigator>
    );
}