import React, {useState, useEffect, route} from 'react';
import { View, Button, Text, Image, TouchableOpacity, StyleSheet, Pressable, TextInput, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getAuth} from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_STORAGE } from './../../firebaseConnection';
import {ref, push, serverTimestamp} from 'firebase/database';
import {getStorage, ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage';

export default function NewPetScreen({route, navigation}){

    const [description, setDescription] = useState('');
    const [selectedRegisterCard, setSelectedRegisterCard] = useState();
    const [selectedPetCard, setSelectedPetCard] = useState();
    const [selectedSizeCard, setSelectedSizeCard] = useState();
    const [selectedGenderCard, setSelectedGenderCard] = useState();
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState('');
    const auth = FIREBASE_AUTH;
    const db = FIREBASE_DB;
    
    const handleRegisterCardPress = (card) => {
        setSelectedRegisterCard(card);
    };
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
            setImage(result.assets[0].uri); 
            console.log(result.assets[0].uri); 
        }
    };

    const goToLocationScreen = async () => {

        navigation.navigate('Location');
    };

    useEffect(() => {
        if(route.params?.location){
            setLocation(route.params?.location);
            console.log('location: '+ JSON.stringify(location));

        }
    }, [route.params]);

    const registerNewPet = async  () => {
        const userId = auth.currentUser?.uid;
        if (!userId){
            Alert.alert('Erro', 'Usuário não autenticado');
            return;
        }

        if (!image || !location){
            Alert.alert('Erro', 'Imagem e localização são obrigatórios');
            return;
        }
        const storage = getStorage();
        const imageRef = storageRef(storage, `pets/${userId}/${Date.now()}.jpg`);

        const img = await fetch(image);
        const bytes = await img.blob();
        await uploadBytes(imageRef, bytes);

        const imageUrl = await getDownloadURL(imageRef);

        var type = ''
        var size = ''
        var gender = ''
        var register = ''

        if (selectedPetCard == 1){
            type = 'gato'
        } else {
            type = 'cachorro'
        }

        if (selectedSizeCard == 1){
            size = 'pequeno'
        } else if (selectedSizeCard == 2) {
            size = 'médio'
        }else{
            size = 'grande'
        }

        if (selectedGenderCard == 1){
            gender = 'fêmea'
        } else if (selectedGenderCard == 2) {
            gender = 'macho'
        }else{
            gender = 'n/d'
        }

        if (selectedRegisterCard == 1){
            register = 'perdido'
        } else {
            register = 'cadastrado'
        }

        const petData = {
            description: description,
            gender: gender,
            image: imageUrl,
            location: location,
            size: size,
            status: register,
            timestamp: serverTimestamp(),
            type: type,
            userId: userId,
        };

        try{
            const petRef = ref(db, 'pets');
            await push(petRef, petData);
            Alert.alert('Sucesso', 'Dados enviados com sucesso!');
        }catch (error){
            console.error('Erro ao enviar os dados: ', error);
            Alert.alert('Erro', 'Falha ao enviar os dados!');
        }


    }


    return(
       <ScrollView>
             <View style={styles.container}>
             <Text style = {styles.formTitle}>CADASTRAR PET</Text>
            <View style={styles.petContainer}>
                <TouchableOpacity
                    style={[styles.cardRegisterSize, selectedRegisterCard === 1 && styles.selectedCard]}
                    onPress={() => handleRegisterCardPress(1)}
                >
                    <Text style={styles.cardTitle}>PERDI MEU PET</Text>
                </TouchableOpacity>
        
                <TouchableOpacity
                    style={[styles.cardRegisterSize, selectedRegisterCard === 2 && styles.selectedCard]}
                    onPress={() => handleRegisterCardPress(2)}
                >
                    <Text style={styles.cardTitle}>ACHEI UM PET PERDIDO</Text>
                </TouchableOpacity>
            </View>
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

            <TextInput style={styles.formInput}
                placeholder="Descrição do animal..."
                keyboardType="text"
                autoCapitalize="none"
                value={description}
                onChangeText={setDescription}
                autoFocus={true}
            />


            <Pressable style={styles.formButton} onPress={registerNewPet}>
             <Text style={styles.textButton}>CADASTRAR ANIMAL</Text>
            </Pressable>
        </View>
       </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 15,
      backgroundColor: '#f3ecdc',
    },
    petContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    card: {
        width: 120,
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        marginHorizontal: 10,
    },
    cardRegisterSize: {
        width: 160,
        height: 55,
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginHorizontal: 5,
    },
    cardSize: {
        width: 100,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginHorizontal: 5,
    },
    cardGender: {
        width: 90,
        height: 90,
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
        width: 48,
        height: 48,
        borderRadius: 10,
    },
    cardTitle: {
       // marginTop: 10,
        fontSize: 14,
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
        marginVertical: 5,
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
        marginTop: 20,
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
    },
    textButton: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    formInput:{
        width: 330,
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 0,
        shadowColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginHorizontal: 10,
        marginTop: 10,

    }

});