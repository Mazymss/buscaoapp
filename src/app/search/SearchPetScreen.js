import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { FIREBASE_DB } from './../../firebaseConnection';
import { ref, onValue } from 'firebase/database';

export default function SearchPetScreen({navigation}) {
  const [locationPermission, setLocationPermission] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [userCity, setUserCity] = useState('');
  const [pets, setPets] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === 'granted');
      
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setUserLocation({ latitude, longitude });

        // Requisição de localização reversa para a localização do usuário
        const reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (reverseGeocode.length > 0) {
          const { city, subregion, region } = reverseGeocode[0];
          setUserCity(city || subregion || region || 'Localização desconhecida');
        }

        fetchPets(location.coords);
      }
    })();
  }, []);

  // Função para converter a localização do pet em cidade/subregião/região
  const getPetLocationName = async (latitude, longitude) => {
    try {
      const reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (reverseGeocode.length > 0) {
        const { city, subregion, region } = reverseGeocode[0];
        return city || subregion || region || 'Localização desconhecida';
      }
    } catch (error) {
      console.error('Erro ao converter a localização:', error);
    }
    return 'Localização desconhecida';
  };

  const fetchPets = (userCoords) => {
    const petsRef = ref(FIREBASE_DB, 'pets');
    onValue(petsRef, async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const petsArray = Object.values(data);
  
        // Converter a localização de cada pet
        const petsWithLocation = await Promise.all(
          petsArray.map(async (pet) => {
            const [latitude, longitude] = pet.location.split(',').map(coord => parseFloat(coord.trim()));
            const locationName = await getPetLocationName(latitude, longitude);
            return { ...pet, locationName }; // Adiciona o nome da localização ao objeto pet
          })
        );
  
        // Adicionar distância e ordenar pets pela proximidade
        const sortedPets = petsWithLocation.map((pet) => {
          const [petLat, petLong] = pet.location.split(",").map(Number);
          const distance = calculateDistance(userCoords.latitude, userCoords.longitude, petLat, petLong);
          return { ...pet, distance }; // Adiciona a distância ao objeto pet
        }).sort((a, b) => a.distance - b.distance); // Ordena pelo valor da distância
        const petsFound = Object.values(sortedPets).filter(pet => pet.status === 'cadastrado' || pet.status === 'perdido');
  
        setPets(petsFound); // Atualiza o estado com a lista ordenada de pets
      }
    });
  };
  

  // Função para calcular a distância entre duas coordenadas geográficas (em km)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degrees) => degrees * (Math.PI / 180);
  
    const R = 6371; // Raio da Terra em km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    const distance = R * c; // Distância em km
    return distance;
  };

  const renderPetItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Description', { pet: item })}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.petImage} />
        {item.status === 'cadastrado' && (
          <View style={[styles.statusBadge, { backgroundColor: 'green' }]}>
            <Text style={styles.statusText}>Buscando dono</Text>
          </View>
        )}
        {item.status === 'perdido' && (
          <View style={[styles.statusBadge, { backgroundColor: 'red' }]}>
            <Text style={styles.statusText}>Desaparecido</Text>
          </View>
        )}
      </View>
      <View style={styles.petInfo}>
        <Text style={styles.petTitle}>{item.type}</Text>
        <Text style={styles.petText}>Porte: {item.size}</Text>
        <Text style={styles.petText}>Sexo: {item.gender}</Text>
        <Text style={styles.petText}>Localização: {item.locationName}</Text>
        <Text style={styles.petText}>Descrição: {item.description}</Text>
      </View>
    </TouchableOpacity>
  );  

  if (!locationPermission) {
    return (
      <View style={styles.container}>
        <Text>Permissão de localização é necessária para encontrar pets próximos.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ENCONTRAR MEU PET</Text>
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
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 4,
    marginBottom: 20,
    flexDirection: 'row',
    padding: 10,
  },
  petImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  petInfo: {
    flex: 1,
    paddingLeft: 10,
  },
  petTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  petText: {
    fontSize: 14,
    color: '#666',
  },
  imageContainer: {
    position: 'relative', // Para posicionar a bandeira sobre a imagem
  },
  statusBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 5,
    borderRadius: 5,
    elevation: 2,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
