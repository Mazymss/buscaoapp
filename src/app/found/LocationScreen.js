import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, Pressable } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location';
import Ionicons from 'react-native-vector-icons/Ionicons';



export default function LocationScreen({navigation}) {

    const [region, setRegion] = useState({
        latitude: -23.55052,
        longitude: -46.633388,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const handleRegionChange = (region) => {
        setRegion(region);
    };

    const handleLocationSelect = () => {
        navigation.navigate('NewPet', {
            location: region.latitude + ", "+ region.longitude,
        });
    }

    const onPress =(e) => {
        const {latitude, longitude} = e.nativeEvent.coordinate;
        setRegion({
            ...region,
            latitude,
            longitude,
        });
    }

    return (
    <View style={styles.container}>
        <MapView
            style={styles.map}
            region={region}
            onRegionChangeComplete={handleRegionChange}
        >
            <Marker coordinate={{latitude: region.latitude, longitude: region.longitude}}/>
        </MapView>

        <TouchableOpacity  style={styles.buttonLocation} onPress={handleLocationSelect}>
           <Text style={styles.locationText}>DEFINIR LOCALIZAÇÃO</Text>
        </TouchableOpacity>
        

        <Button title = "Definir Localização" onPress={handleLocationSelect}/>
      
    </View>

    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
        width: '100%',
        height: '80%',
    },
    Button: {
        backgroundColor: '#9d6964',
        width: '80%',
        marginTop: 32,
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
    },
  });

