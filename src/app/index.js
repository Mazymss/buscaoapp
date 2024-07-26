import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Link } from 'expo-router';


export default function Home() {
    return (
    <View style={styles.container}>
      <Image source={require('../../../assets/logo.jpg')} style={styles.logo} />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>ENCONTREI UM PET</Text>
        <Icon name="paw" size={20} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>PROCURO MEU PET</Text>
        <Icon name="search" size={20} color="#000" />
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>ÚLTIMOS PETS ENCONTRADOS</Text>
      <FlatList
        data={pets}
        renderItem={({ item }) => <Image source={{ uri: item.image }} style={styles.petImage} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>

    );
}

const pets = [
    { id: '1', image: 'https://via.placeholder.com/100' },
    { id: '2', image: 'https://via.placeholder.com/100' },
    { id: '3', image: 'https://via.placeholder.com/100' },
    { id: '4', image: 'https://via.placeholder.com/100' },
];

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
  });


