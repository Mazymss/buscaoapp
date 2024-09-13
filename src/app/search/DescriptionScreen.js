import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, Platform, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FIREBASE_DB } from './../../firebaseConnection';
import { ref, get } from 'firebase/database';

export default function DescriptionScreen({ route }) {
  const { pet } = route.params;

  const backgroundColor = pet.status === 'cadastrado' || pet.status === 'perdido' ? '#FF6B6B' : '#4CAF50';
  const statusText = pet.status === 'cadastrado' 
    ? 'PET ENCONTRADO' 
    : pet.status === 'perdido' 
      ? 'PET PERDIDO' 
      : 'PET RESGATADO';

  // Função para buscar o telefone no Firebase e abrir o WhatsApp
const contactPetOwner = async (userId) => {
    try {
      // Referência à tabela 'users' no Firebase
      const userRef = ref(FIREBASE_DB, `users/${userId}`);
      
      // Obtém os dados do usuário pelo userId
      const snapshot = await get(userRef);
      
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const phone = userData.phone; // Acessa o número de telefone do usuário
        
        if (phone) {
          // Gera o link para o WhatsApp
          const whatsappLink = `https://wa.me/+55${phone}/?text=Olá, você cadastrou meu ${pet.type} na plataforma Buscão. Como posso resgatá-lo?`;
          
          // Abre o WhatsApp com o número
          Linking.openURL(whatsappLink).catch((err) => {
            Alert.alert('Erro', 'Não foi possível abrir o WhatsApp.');
            console.error('Erro ao abrir o WhatsApp:', err);
          });
        } else {
          Alert.alert('Erro', 'Número de telefone não encontrado para este usuário.');
        }
      } else {
        Alert.alert('Erro', 'Usuário não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar o telefone do usuário:', error);
      Alert.alert('Erro', 'Falha ao buscar o número de telefone do dono.');
    }
  };

  const openMap = (location) => {
    const [latitude, longitude] = location.split(',').map(coord => coord.trim());
  
    const url = Platform.select({
      ios: `maps://maps.apple.com/?q=${latitude},${longitude}`,
      android: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
    });

    console.log(url)
  
    Linking.openURL(url).catch(err => console.error('Erro ao abrir o mapa', err));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Card com status do pet */}
      <View style={[styles.statusCard, { backgroundColor }]}>
        <Text style={styles.statusText}>{statusText}</Text>
      </View>

      {/* Botão para ver localização */}
      <TouchableOpacity style={styles.locationButton} onPress={() => openMap(pet.location)}>
        <MaterialIcons name="location-on" size={24} color="#000" />
        <Text style={styles.locationText}>VER LOCALIZAÇÃO</Text>
      </TouchableOpacity>

      {/* Imagem do pet */}
      <Image source={{ uri: pet.image }} style={styles.petImage} />

      {/* Descrição do pet */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.petDescription}>{pet.description}</Text>

        <TouchableOpacity onPress={() => contactPetOwner(pet.userId)} style={styles.contactButton}>
            <Text style={styles.contactButtonText}>ENTRAR EM CONTATO</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusCard: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  statusText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 16,
    backgroundColor: '#E8E8E8',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  locationText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  petImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginVertical: 20,
  },
  descriptionContainer: {
    padding: 20,
  },
  petDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  contactButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
