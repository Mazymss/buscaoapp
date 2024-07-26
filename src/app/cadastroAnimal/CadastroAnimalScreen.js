import { TextInput, Text, View, Pressable } from 'react-native';
import {styles} from './CadastroAnimalStyles';


export default function CadastroAnimal(){
    return(
        <View style={styles.cadastro.container}>
            <Pressable style={styles.cadastro.formButton}>
                <Text style={styles.cadastro.textButton}>Logar</Text>
            </Pressable>
        </View>

    );
}