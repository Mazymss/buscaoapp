import React, {useState, useEffect} from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, StyleSheet, Pressable, TextInput, ScrollView, Alert } from 'react-native';
import * as Location from 'expo-location';
import { FIREBASE_DB } from './../../firebaseConnection';
import {ref, onValue} from 'firebase/database';

export default function SearchPetScreen({navigation}){

    const [locationPermission, setLocationPermission] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [pets, setPets] = useState([]);

    useEffect(()=> {
        (async () => {
            const {status} = await Location.requestForegroundPermissionsAsync();
            setLocationPermission(status === 'granted');

            if(status === 'granted'){
                const location = await Location.getCurrentPositionAsync({});
                setUserLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
                fetchPets();
            }
        })();
    },[]);

    const fetchPets = () => {
        const petsRef = ref(FIREBASE_DB, 'pets');
        onValue(petsRef, (snapshot) => {
            const data = snapshot.val();
            if (data){
                const petsArray = Object.values(data);
                setPets(petsArray);
            }
        });
    };

    const renderPetItem = ({item}) => (
        <TouchableOpacity styles={styles.card}>
            <Image source={{uri: item.image}} style={styles.petImage} />
            <View style={styles.petInfo}>
                <Text style={styles.petTitle}> Descrição: {item.description}</Text>
                <Text style={styles.petText}>Porte: {item.size}</Text>
                <Text style={styles.petText}>Sexo: {item.gender}</Text>
                <Text style={styles.petText}>Localiização: {item.location}</Text>
            </View>
        </TouchableOpacity>
    );

    if(!locationPermission){
        return(
            <View style = {styles.container}>
                <Text>Permissão de localização é necessária para encontrar pets próximos</Text>
            </View>
        );
    }


    return(
        <View style={styles.container}>
            <Text style = {styles.title}> ENCONTRAR MEU PET</Text>
            <FlatList
                data={pets}
                renderItem={renderPetItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.list}
            
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: '#f3ecdc',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#9d6964',
        marginVertical: 20,
    },
    list: {
        width: '100%',
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        marginVertical: 10,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    petImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 15,
    },
    petInfo: {
        flex: 1,
    },
    petTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#9d6964',
        marginBottom: 5,
    },
    petText: {
        fontSize: 14,
        color: '#333',
        marginBottom: 3,
    },
});



