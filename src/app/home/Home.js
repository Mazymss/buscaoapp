import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-snap-carousel';
import { FIREBASE_DB } from './../../firebaseConnection';
import { onValue, query, ref, get, orderByChild, limitToLast } from 'firebase/database';


const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SLIDER_WIDTH * 0.50;



export default function Home({navigation}) {

  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const getPets = () => {
      const db = FIREBASE_DB;
      const petsRef = query(ref(db, 'pets'), orderByChild('timestamp'), limitToLast(10));

      const unsubscribe = onValue(petsRef, (snapshot) => {
        const filteredPets = [];
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log("Dados brutos do Firebase: ", data);

          Object.keys(data).forEach((key) => {
            const pet = data[key];
            if (pet.status === 'cadastrado' || pet.status === 'perdido') {
              filteredPets.unshift(pet);
            }
          });
        } else {
          console.log("Nenhum dado disponível");
        }
        setCarouselItems(filteredPets);
        setLoading(false);
      });

      // Retorna a função de limpeza para remover o listener do Firebase
      return unsubscribe;
    };

    const unsubscribe = getPets();
    // Função de limpeza para remover o listener ao desmontar o componente
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);


  function carouselCardItem({ item, index }) {
    return (
      <View style={styles.cardCarousel} key={index}>
        <Image style={styles.image} source={{ uri: item.image }} />
      </View>
    );
  }

    return (
    <View style={styles.container}>
      <Image source={require('./../../../assets/logo.jpg')} style={styles.logo} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NewPet')}>
        <Text style={styles.buttonText}>CADASTRAR UM PET</Text>
        <Icon name="paw" size={20} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SearchPet')}>
        <Text style={styles.buttonText}>PROCURAR UM PET</Text>
        <Icon name="search" size={20} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManagePet')}>
        <Text style={styles.buttonText}>MEUS PETS CADASTRADOS</Text>
        <Icon name="search" size={20} color="#000" />
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>ÚLTIMOS PETS ENCONTRADOS</Text>
      {loading ? (
        <ActivityIndicator size="large" color= "#000" />
      ) : (
        <Carousel
        data={carouselItems}
        renderItem={carouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        useScrollView={true}
        />
      )}

    </View>

    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 50,
      backgroundColor: '#f3ecdc',
    },
    logo: {
      width: 200,
      height: 150,
      marginBottom: 20,
    },
    formTitle: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'blueviolet',
      margin: 10,
  },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#9d6964',
      padding: 15,
      marginVertical: 10,
      borderRadius: 10,
      width: '80%',
      justifyContent: 'space-between',
    },
    buttonText: {
      color: '#000',
      fontWeight: 'bold',
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
    petImage: {
      width: 100,
      height: 100,
      borderRadius: 10,
      marginHorizontal: 5,
    },
    cardCarousel:{
      width: ITEM_WIDTH,
    },
    image: {
      height: 250,
      borderRadius: 8
    }
  });


