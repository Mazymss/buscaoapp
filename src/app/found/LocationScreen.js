import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, Pressable } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import Ionicons from 'react-native-vector-icons/Ionicons';



export default function LocationScreen({navigation}) {

    const [locationPermission, setLocationPermission] = useState(null);

    const requestLocalPermission = async () => {
        const {status} = await Location.requestForegroundPermissionsAsync();
        setLocationPermission(status === 'granted');
        if (status !== 'granted'){
            Alert.alert('Permissão de localização negada. Você precisa conceder permissão para usar a localização');
        } else {
            getUserLocation();
        }
    };

    const getUserLocation = async () => {
        const location = await Location.getCurrentPositionAsync({});
        setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
    };

    useEffect(() => {
        requestLocalPermission();
    }, []);

    

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

    const onMapPress = (e) => {
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
            onPress={onMapPress}
            showsUserLocation={true}
            followsUserLocation={true}>

            <Marker coordinate={{latitude: region.latitude, longitude: region.longitude}}/>
        </MapView>

        <TouchableOpacity  style={styles.buttonLocation} onPress={handleLocationSelect}>
           <Text style={styles.locationText}>DEFINIR LOCALIZAÇÃO</Text>
        </TouchableOpacity>
      
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
    locationText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },
    buttonLocation: {
        backgroundColor: '#9d6964',
        width: '100%',
        marginTop: 32,
        padding: 16,
        alignItems: 'center',
    },
  });
  

