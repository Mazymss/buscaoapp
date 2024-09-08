import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './login/LoginScreen'
import SignUpScreen from './login/SignUpScreen'
import RecoverScreen from './login/RecoverScreen'
import Home from './home/Home'
import NewPetScreen from './found/NewPetScreen'


const Stack = createStackNavigator();

export default function App(){
    return(
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Recover" component={RecoverScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
                <Stack.Screen name="NewPet" component={NewPetScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}