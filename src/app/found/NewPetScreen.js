
import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function NewPetScreen({navigation}){

    const [description, setDescription] = useState('');
    const [selectedPetCard, setSelectedPetCard] = useState();
    const [selectedSizeCard, setSelectedSizeCard] = useState();
    const [selectedGenderCard, setSelectedGenderCard] = useState();

    const handlePetCardPress = (card) => {
        selectedPetCard(card);
    };
    const handlePSizeCardPress = (card) => {
        selectedSizeCard(card);
    };
    const handleGenderCardPress = (card) => {
        selectedGenderCard(card);
    };


    return(
        <View style={styles.container}>
            <View style={styles.petContainer}>
                <TouchableOpacity>
                    style={[styles.card, selectedPetCard === 1 && styles.selectedCard]}
                    onPress={() => handleCardPress(1)}
                    <Image
                        source={require('./../../../assets/cat.png')}
                        style={styles.cardImage}/>
                    <Text style={styles.cardTitle}> Gato </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    style={[styles.card, selectedPetCard === 2 && styles.selectedCard]}
                    onPress={() => handleCardPress(1)}
                    <Image
                        source={require('./../../../assets/dog.png')}
                        style={styles.cardImage}/>
                    <Text style={styles.cardTitle}> Cachorro </Text>
                </TouchableOpacity>
            </View>
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
        marginTop: 50,
    },
    card: {
        width: 150,
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    selectedCard: {
        borderColor: '#6200ee',
        boderWidth: 2,
    },
    cardImage: {
        width: '100%',
        height: '70%',
        borderRadius: 10,
    },
    cardTitle: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});