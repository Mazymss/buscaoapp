import React, {useState, useEffect} from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, StyleSheet, Pressable, TextInput, ScrollView, Alert } from 'react-native';
import * as Location from 'expo-location';
import { FIREBASE_DB } from './../../firebaseConnection';
import {ref, onValue} from 'firebase/database';

export default function SearchPetScreen({navigation}){

    const [locationPermission, setLocationPermission] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [userCity, setUserCity] = useState('');
    const [pets, setPets] = useState([]);

    useEffect(()=> {
        (async () => {
            const {status} = await Location.requestForegroundPermissionsAsync();
            setLocationPermission(status === 'granted');

            if(status === 'granted'){
                const location = await Location.getCurrentPositionAsync({});
                console.log('location: ' + JSON.stringify(location))
                const {latitude, longitude} = location.coords;
                setUserLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });

                const reverseGeocode = await Location.reverseGeocodeAsync({latitude, longitude});
                console.log('reverseGeocode' + reverseGeocode)
                if(reverseGeocode.lenght > 0){
                    const {city, subregion, region} = reverseGeocode[0];
                    setUserCity(city || subregion || region || 'Localização desconhecida');
                }


                fetchPets();
            }
        })();
    },[]);

    const fetchPets = () => {
        const petsRef = ref(FIREBASE_DB, 'pets');
        onValue(petsRef, (snapshot) => {
            const data = snapshot.val();
            if (data && userLocation) {
                let petsArray = Object.values(data);

                petsArray = petsArray.map((pet) => {
                    const [petLat, petLng] = pet.location.split(',').map(Number);
                    const distance = calculateDistance(userLocation.latitude, userLocation.longitude, petLat, petLng);
                    return {...pet, distance};
                }).sort((a,b) => a.distance - b.distance);
                setPets(petsArray);
            }
        });
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Raio da Terra em quilômetros
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        const distance = R * c; // Distância em km
        return distance;
    }

    const deg2rad = (deg) => {
        return deg * (Math.PI/180);
    }

    const renderPetItem = ({item}) => (
        <TouchableOpacity styles={styles.card}>
            <Image source={{uri: item.image}} style={styles.petImage} />
            <View style={styles.petInfo}>
                <Text style={styles.petTitle}> Descrição: {item.description}</Text>
                <Text style={styles.petText}>Porte: {item.size}</Text>
                <Text style={styles.petText}>Sexo: {item.gender}</Text>
                <Text style={styles.petText}>Localiização: {item.location}</Text>
                <Text style={styles.petText}>Distância: {item.distance.toFixed(2)} km</Text>
            </View>
        </TouchableOpacity>
    );

    if(locationPermission === null){
        return(
            <View style={styles.container}>
                <Text>Solicitando permissão de localização...</Text>
            </View>
        );
    }

    if(!locationPermission){
        return(
            <View style={styles.container}>
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



