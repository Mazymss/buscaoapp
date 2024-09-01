import React, {useState} from 'react';
import { TextInput, Text, View, Pressable } from 'react-native';
import { FIREBASE_AUTH } from './../../firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {styles} from './LoginStyles';



export default function LoginScreen({navigation }) {

  const [email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async ()=> {
    setLoading(true);
    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      navigation.navigate('Home');
    } catch (error){
      console.log(error);
    } finally{
      setLoading(false);
    }
  }


  return (
    <View style={styles.login.container}>
      <Text style = {styles.login.formTitle}>Bem-vindo ao Buscão!</Text>
      <TextInput style = {styles.login.formImput} 
        placeholder="Informe o e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        value={email}
        onChangeText={setEmail}
        autoFocus={true}

      />
      <TextInput style= {styles.login.formImput} 
        placeholder="Informe a senha"
        autoCapitalize="none"
        secureTextEntry
        value={password}
        onChangeText={setPassword}

      />
      <Pressable style={styles.login.formButton} onPress={signIn}>
        <Text style={styles.login.textButton}>Logar</Text>
      </Pressable>
      <View style={styles.login.subContainer}>
        <Pressable style={styles.login.subButton} onPress={() => navigation.navigate('Recover')}>
          <Text style={styles.login.subTextButton}>Esqueci minha senha</Text>
        </Pressable>
        <Pressable style={styles.login.subButton} onPress={()=> navigation.navigate('SignUp')}>
          <Text style={styles.login.subTextButton}>Novo usuário</Text>
        </Pressable>
      </View>
    </View>
  );
}

