import React, {useState} from 'react';
import { TextInput, Text, View, Pressable } from 'react-native';
import { FIREBASE_AUTH } from './../../firebaseConnection';
import {styles} from './LoginStyles';



export default function LoginScreen() {

  const [email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async ()=> {
    setLoading(true);
    try{
      const response = await auth.signInWithEmailAndPassword(email, password);
      console.log(response);
    } catch (error){
      console.log(error);
    } finally{
      setLoading(false);
    }
  }

  const signUp = async ()=> {
    setLoading(true);
    try{
      const response = await auth.createUserWithEmailAndPassword(email, password);
      console.log(response);
    } catch(error){
      console.log(error);
    } finally{
      setLoading(false);
    }
  }


  return (
    <View style={styles.login.container}>
      <Text style = {styles.login.formTitle}>Login no sistema</Text>
      <TextInput style = {styles.login.formImput} 
        placeholder="Informe o e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        value={email}
        onchangeText={setEmail}
      />
      <TextInput style= {styles.login.formImput} 
        placeholder="Informe a senha"
        autoCapitalize="nome"
        secureTextEntry
        value={password}
        onchangeText={setPassword}

      />
      <Pressable style={styles.login.formButton} onPress={signIn}>
        <Text style={styles.login.textButton}>Logar</Text>
      </Pressable>
      <View style={styles.login.subContainer}>
        <Pressable style={styles.login.subButton}>
          <Text style={styles.login.subTextButton}>Esqueci minha senha</Text>
        </Pressable>
        <Pressable style={styles.login.subButton} onPress={signUp}>
          <Text style={styles.login.subTextButton}>Novo usuário</Text>
        </Pressable>
      </View>
    </View>
  );
}

