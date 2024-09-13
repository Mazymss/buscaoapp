import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './login/LoginScreen'
import SignUpScreen from './login/SignUpScreen'
import RecoverScreen from './login/RecoverScreen'
import Home from './home/Home'
import NewPetScreen from './found/NewPetScreen'
import LocationScreen from './found/LocationScreen'
import SearchPetScreen from './search/SearchPetScreen'
import ManagePetScreen from './manage/ManagePetScreen'
import DescriptionScreen from './search/DescriptionScreen';

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
                <Stack.Screen name="Location" component={LocationScreen} options={{headerShown: false}}/>
                <Stack.Screen name="SearchPet" component={SearchPetScreen} options={{headerShown: false}}/>
                <Stack.Screen name="ManagePet" component={ManagePetScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Description" component={DescriptionScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}