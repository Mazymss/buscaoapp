
import React, {useState, useEffect, route} from 'react';
import { View, Button, Text, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function NewPetScreen({navigation}){

    const [description, setDescription] = useState('');
    const [selectedPetCard, setSelectedPetCard] = useState();
    const [selectedSizeCard, setSelectedSizeCard] = useState();
    const [selectedGenderCard, setSelectedGenderCard] = useState();
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState(null);

    const handlePetCardPress = (card) => {
        setSelectedPetCard(card);
    };
    const handleSizeCardPress = (card) => {
        setSelectedSizeCard(card);
    };
    const handleGenderCardPress = (card) => {
        setSelectedGenderCard(card);
    };

    const pickImage = async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted'){
            alert('Precisamos da permissão para acessar sua galeria');
            return;
        }

      
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
        if (!result.canceled){
            setImage(result.assets.uri); 
            console.log(result.assets.uri); 
        }
    };

    const goToLocationScreen = async () => {

        navigation.navigate('Location');
    };

    useEffect(() => {
        if(router.params?.location){
            setLocation({
                latitude: router.params.latitude,
                longitude: router.params.longitude,
            });
        }
    }, [route.params]);


    return(
        <View style={styles.container}>
            <Text style = {styles.formTitle}>SELECIONE O ANIMAL: </Text>
            <View style={styles.petContainer}>
                <TouchableOpacity
                    style={[styles.card, selectedPetCard === 1 && styles.selectedCard]}
                    onPress={() => handlePetCardPress(1)}
                >
                    <Image
                        source={require('./../../../assets/cat.png')}
                        style={styles.cardImage}
                    />
                    <Text style={styles.cardTitle}>GATO</Text>
                </TouchableOpacity>
        
                <TouchableOpacity
                    style={[styles.card, selectedPetCard === 2 && styles.selectedCard]}
                    onPress={() => handlePetCardPress(2)}
                >
                    <Image
                        source={require('./../../../assets/dog.png')}
                        style={styles.cardImage}
                    />
                    <Text style={styles.cardTitle}>CACHORRO</Text>
                </TouchableOpacity>
            </View>
            <Text style = {styles.formTitle}>SELECIONE O PORTE: </Text>
            <View style={styles.petContainer}>
                <TouchableOpacity
                    style={[styles.cardSize, selectedSizeCard === 1 && styles.selectedCard]}
                    onPress={() => handleSizeCardPress(1)}
                >
                    <Text style={styles.cardTitle}>PEQUENO</Text>
                </TouchableOpacity>
        
                <TouchableOpacity
                    style={[styles.cardSize, selectedSizeCard === 2 && styles.selectedCard]}
                    onPress={() => handleSizeCardPress(2)}
                >
                    <Text style={styles.cardTitle}>MÉDIO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.cardSize, selectedSizeCard === 3 && styles.selectedCard]}
                    onPress={() => handleSizeCardPress(3)}
                >
                    <Text style={styles.cardTitle}>GRANDE</Text>
                </TouchableOpacity>
            </View>

            <Text style = {styles.formTitle}>SELECIONE O SEXO: </Text>
            <View style={styles.petContainer}>
                <TouchableOpacity
                    style={[styles.cardGender, selectedGenderCard === 1 && styles.selectedCard]}
                    onPress={() => handleGenderCardPress(1)}
                >
                    <Image
                        source={require('./../../../assets/venus.png')}
                        style={styles.cardImage}
                    />
                    <Text style={styles.cardTitle}>FÊMEA</Text>
                </TouchableOpacity>
        
                <TouchableOpacity
                    style={[styles.cardGender, selectedGenderCard === 2 && styles.selectedCard]}
                    onPress={() => handleGenderCardPress(2)}
                >
                    <Image
                        source={require('./../../../assets/male.png')}
                        style={styles.cardImage}
                    />
                    <Text style={styles.cardTitle}>MACHO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.cardGender, selectedGenderCard === 3 && styles.selectedCard]}
                    onPress={() => handleGenderCardPress(3)}
                >
                    <Image
                        source={require('./../../../assets/int.png')}
                        style={styles.cardImage}
                    />
                    <Text style={styles.cardTitle}>N/D</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style = {styles.buttonCamera} onPress={pickImage}>
            <Text style={styles.buttonText}>CARREGAR FOTO</Text>
            <Ionicons name = "camera" size={24} color="white"></Ionicons>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.locationButton} onPress={goToLocationScreen}>
            <Text style={styles.locationText}>LOCALIZAÇÃO</Text>
            <Ionicons name = "location-outline" size={24} color="white"></Ionicons>
            </TouchableOpacity>

            <Pressable style={styles.formButton}>
             <Text style={styles.textButton}>CADASTRAR ANIMAL</Text>
            </Pressable>
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
    petContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    card: {
        width: 110,
        height: 150,
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginHorizontal: 10,
    },
    cardSize: {
        width: 100,
        height: 70,
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginHorizontal: 10,
    },
    cardGender: {
        width: 90,
        height: 120,
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginHorizontal: 10,
    },
    selectedCard: {
        borderColor: '#9d6964',
        borderWidth: 2,
    },
    cardImage: {
        width: '50%',
        height: '35%',
        borderRadius: 10,
    },
    cardTitle: {
       // marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    formTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#9d6964',
        margin: 10,
    },
    buttonCamera: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#9d6964',
        padding: 15,
        marginVertical: 10,
        marginTop: 20,
        borderRadius: 10,
        width: '80%',
        justifyContent: 'space-between',
    },
    buttonText:{
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },

    locationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#9d6964',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        width: '80%',
        justifyContent: 'space-between',
    },
    locationText:{
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },
    formButton: {
        backgroundColor: '#9d6964',
        width: '80%',
        marginTop: 32,
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
    },
    textButton: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },

});