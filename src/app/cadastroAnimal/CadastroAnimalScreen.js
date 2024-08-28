import React, {useState} from 'react';
import { TextInput, Text, View, Pressable } from 'react-native';
import { FIREBASE_AUTH } from './../../firebaseConnection';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {styles} from './CadastroAnimalStyles';


export default function CadastroAnimal({navigation}){

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

        
    const signUp = async ()=> {
        setLoading(true);
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error){
            console.log(error);
        } finally{
            setLoading(false);
        }
    }

    return(
        <View style={styles.login.container}>
        <Text style = {styles.login.formTitle}>Criar nova conta</Text>
        <TextInput style = {styles.login.formImput} 
          placeholder="Endereço de e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          value={email}
          onChangeText={setEmail}
          autoFocus={true}
  
        />
        <TextInput style = {styles.login.formImput} 
          placeholder="Nome"
          keyboardType="text"
          autoCapitalize="none"
          value={name}
          onChangeText={setName}
          autoFocus={true}
  
        />
        <TextInput style= {styles.login.formImput} 
          placeholder="Informe a senha"
          autoCapitalize="none"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
  
        />
        <Pressable style={styles.login.formButton} onPress={signUp} disabled={loading}>
          <Text style={styles.login.textButton}>Criar conta</Text>
        </Pressable>
        <View style={styles.login.subContainer}>
          <Pressable style={styles.login.subButton} onPress={()=> navigation.goBack()} disabled={loading}>
            <Text style={styles.login.subTextButton}>Já possuo cadastro</Text>
          </Pressable>
        </View>
      </View>


    );
}