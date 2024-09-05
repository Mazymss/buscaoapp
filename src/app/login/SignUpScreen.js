import React, {useState} from 'react';
import { TextInput, Text, View, Pressable, Alert } from 'react-native';
import { FIREBASE_AUTH } from './../../firebaseConnection';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {getDatabase, ref, set, serverTimestamp} from 'firebase/database';
import {styles} from './LoginStyles';


export default function SignUpScreen({navigation}){

    const errorMessages = {
      'auth/email-already-in-use':
        'O e-mail fornecido já está em uso. Por favor, utilize outro e-mail.',
      'auth/invalid-email' :
        'O e-mail fornecido é inválido. Por favor, verifique e tente novamente.',
      'auth/operation-not-allowed':
        'O cadastro de usuários está desabilitado no momento.',
      'auth/weak-password':
        'A senha fornecida é muito fraca. Por favor escolha uma senha mais forte.',
      default: 'Ocorreu um erro durante o cadastro. Por favor, tente novamente.',

    };

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH; 

        
    const signUp = async ()=> {
        setLoading(true);
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            await saveUserData(response);
            navigation.navigate('Home');
        } catch (error){
            console.log(error);
            const friendlyErrorMessage = getFriendlyErrorMessage(error.code);
            Alert.alert(friendlyErrorMessage);
        } finally{
            setLoading(false);
        }
    }

    const getFriendlyErrorMessage = errorCode => {
      return errorMessages[errorCode] || errorMessages['default'];
    };

    const saveUserData = async user => {
      const db = getDatabase();
      await set(ref(db, 'users/' + user.user.uid), {
        mail: user.user.email,
        createdAt: serverTimestamp(),
        name: name,
        phone: phone
      });
    };

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

        <TextInput style = {styles.login.formImput} 
          placeholder="Contato"
          keyboardType="phone"
          autoCapitalize="none"
          value={phone}
          onChangeText={setPhone}
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