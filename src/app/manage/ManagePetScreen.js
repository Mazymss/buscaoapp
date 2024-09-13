import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Button } from 'react-native';
import { FIREBASE_DB, FIREBASE_AUTH } from './../../firebaseConnection';
import { ref, onValue, update } from 'firebase/database';

export default function ManagePetScreen({navigation}) {
  const [pets, setPets] = useState([]);
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return; // Verifique se o userId está disponível

    const petsRef = ref(FIREBASE_DB, 'pets');
    onValue(petsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const petsArray = Object.keys(data).map(key => ({ id: key, ...data[key] }))
                              .filter(pet => pet.userId === userId);
        // Filtra apenas os pets cujo userId corresponde ao do usuário autenticado
        setPets(petsArray);
      }
    });
  };

  const markAsRescued = (petId) => {
    const petRef = ref(FIREBASE_DB, `pets/${petId}`);
    update(petRef, { status: 'resgatado' })
      .then(() => {
        console.log('Pet resgatado com sucesso!');
        fetchPets(); // Atualize a lista após a mudança
      })
      .catch((error) => {
        console.error('Erro ao atualizar o status:', error);
      });
  };

  const renderPetItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.petImage} />
      <View style={styles.petInfo}>
        <Text style={styles.petTitle}>{item.type}</Text>
        <Text style={styles.petText}>Porte: {item.size}</Text>
        <Text style={styles.petText}>Sexo: {item.gender}</Text>
        <Text style={styles.petText}>Descrição: {item.description}</Text>
        {/* Botão para marcar como resgatado */}
        <TouchableOpacity
          style={styles.rescueButton}
          onPress={() => markAsRescued(item.id)}
        >
          <Text style={styles.rescueButtonText}>PET RESGATADO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GERENCIAR MEUS PETS</Text>
      <FlatList
        data={pets}
        renderItem={renderPetItem}
        keyExtractor={(item) => item.id}
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
  rescueButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  rescueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
