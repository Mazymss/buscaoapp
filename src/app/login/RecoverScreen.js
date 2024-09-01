import React, {useState} from 'react';
import { TextInput, Text, View, Pressable, Alert } from 'react-native';
import { FIREBASE_AUTH } from './../../firebaseConnection';
import { sendPasswordResetEmail} from 'firebase/auth';
import {styles} from './LoginStyles';



export default function RecoverScreen({navigation }) {

  const [email, setEmail] = useState('');
  const[loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const handlePasswordReset = async () => {
    try{
        await sendPasswordResetEmail(auth, email);
        Alert.alert('E-mail enviado', 'Verifique sua caixa de entrada para redefinir sua senha.');
        navigation.goBack();
    } catch{
        Alert.alert('Erro', error.message);
    }
  }

  return (
    <View style={styles.login.container}>
      <Text style = {styles.login.formTitle}>Recuperar senha</Text>
      <TextInput style = {styles.login.formImput} 
        placeholder="Informe o e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        value={email}
        onChangeText={setEmail}
        autoFocus={true}

      />

      <Pressable style={styles.login.formButton} onPress={handlePasswordReset}>
        <Text style={styles.login.textButton}>Enviar e-mail de recuperação</Text>
      </Pressable>
    </View>
  );
}

