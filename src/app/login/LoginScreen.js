import { StatusBar } from 'expo-status-bar';
import { TextInput, Text, View, Pressable } from 'react-native';
import {styles} from './LoginStyles';
import {Link} from 'expo-router';


export default function App() {
  return (
    <View style={styles.login.container}>
      <Text style = {styles.login.formTitle}>Login no sistema</Text>
      <TextInput style = {styles.login.formImput} 
        placeholder="Informe o e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      <TextInput style= {styles.login.formImput} 
        placeholder="Informe a senha"
        autoCapitalize="nome"
        secureTextEntry

      />
      <Pressable style={styles.login.formButton}>
        <Text style={styles.login.textButton}>Logar</Text>
      </Pressable>
      <View style={styles.login.subContainer}>
        <Pressable style={styles.login.subButton}>
          <Text style={styles.login.subTextButton}>Esqueci minha senha</Text>
        </Pressable>
        <Pressable style={styles.login.subButton}>
          <Text style={styles.login.subTextButton}>Novo usuário</Text>
        </Pressable>
      </View>
    </View>
  );
}

